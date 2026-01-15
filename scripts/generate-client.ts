#!/usr/bin/env npx ts-node

/**
 * Auto-generates client.ts from OpenAPI spec
 * Groups endpoints by tags and creates ergonomic method names
 */

import * as fs from 'fs';
import * as yaml from 'yaml';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface OpenAPISpec {
  paths: Record<string, Record<string, OperationObject>>;
}

interface OperationObject {
  tags?: string[];
  operationId?: string;
  summary?: string;
}

// Map OpenAPI tags to SDK namespace names
const TAG_TO_NAMESPACE: Record<string, string> = {
  'Posts': 'posts',
  'Accounts': 'accounts',
  'Profiles': 'profiles',
  'Analytics': 'analytics',
  'Account Groups': 'accountGroups',
  'Queue': 'queue',
  'Webhooks': 'webhooks',
  'API Keys': 'apiKeys',
  'Media': 'media',
  'Tools': 'tools',
  'Users': 'users',
  'Usage': 'usage',
  'Logs': 'logs',
  'Connect': 'connect',
  'Reddit Search': 'reddit',
  'Invites': 'invites',
  'GMB Reviews': 'accounts',  // Group under accounts
  'LinkedIn Mentions': 'accounts',  // Group under accounts
};

// Map HTTP methods to function name prefixes in generated code
const METHOD_PREFIX: Record<string, string> = {
  'get': 'get',
  'post': 'post',
  'put': 'put',
  'patch': 'patch',
  'delete': 'delete',
};

// Convert path to generated function name (fallback when no operationId)
// e.g., /v1/posts/{postId} + GET -> getV1PostsByPostId
function pathToFunctionName(pathStr: string, method: string): string {
  const prefix = METHOD_PREFIX[method] || method;

  // Convert path to camelCase function name
  const pathPart = pathStr
    .replace(/^\//, '') // Remove leading slash
    .replace(/\{([^}]+)\}/g, 'By$1') // {postId} -> ByPostId
    .split(/[/-]/)
    .map((part, index) => {
      if (index === 0) return part.toLowerCase();
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');

  return prefix + pathPart.charAt(0).toUpperCase() + pathPart.slice(1);
}

// Get the actual generated function name - uses operationId if available
function getGeneratedFunctionName(operationId: string | undefined, pathStr: string, method: string): string {
  if (operationId) {
    // hey-api uses operationId directly as the function name
    return operationId;
  }
  // Fallback to path-based name
  return pathToFunctionName(pathStr, method);
}

// Convert operationId or path to a friendly method name
function toMethodName(operationId: string | undefined, pathStr: string, method: string): string {
  if (operationId) {
    // Use operationId directly as method name (already camelCase)
    return operationId;
  }

  // Fallback: derive from path
  const pathParts = pathStr.split('/').filter(p => p && !p.startsWith('{') && p !== 'v1');
  const lastPart = pathParts[pathParts.length - 1] || 'resource';

  const methodMap: Record<string, string> = {
    'get': pathStr.includes('{') ? 'get' : 'list',
    'post': 'create',
    'put': 'update',
    'patch': 'update',
    'delete': 'delete',
  };

  return methodMap[method] || method;
}

// Group operations by tag/namespace
interface OperationInfo {
  functionName: string;
  methodName: string;
  path: string;
  method: string;
  summary?: string;
}

function groupOperationsByNamespace(spec: OpenAPISpec): Map<string, OperationInfo[]> {
  const namespaces = new Map<string, OperationInfo[]>();

  for (const [pathStr, pathItem] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;

      const tags = operation.tags || ['Other'];
      const primaryTag = tags[0];
      const namespace = TAG_TO_NAMESPACE[primaryTag] || primaryTag.toLowerCase().replace(/\s+/g, '');

      if (!namespaces.has(namespace)) {
        namespaces.set(namespace, []);
      }

      const functionName = getGeneratedFunctionName(operation.operationId, pathStr, method);
      const methodName = toMethodName(operation.operationId, pathStr, method);

      namespaces.get(namespace)!.push({
        functionName,
        methodName,
        path: pathStr,
        method,
        summary: operation.summary,
      });
    }
  }

  return namespaces;
}

// Handle special nested namespaces (connect.facebook, connect.telegram, etc.)
function organizeConnectNamespace(operations: OperationInfo[]): { flat: OperationInfo[], nested: Map<string, OperationInfo[]> } {
  const flat: OperationInfo[] = [];
  const nested = new Map<string, OperationInfo[]>();

  const subNamespaces = ['facebook', 'googlebusiness', 'linkedin', 'pinterest', 'snapchat', 'bluesky', 'telegram'];

  for (const op of operations) {
    const pathLower = op.path.toLowerCase();
    let foundSub = false;

    for (const sub of subNamespaces) {
      if (pathLower.includes(`/connect/${sub}`)) {
        const subName = sub === 'googlebusiness' ? 'googleBusiness' : sub;
        if (!nested.has(subName)) {
          nested.set(subName, []);
        }
        nested.get(subName)!.push(op);
        foundSub = true;
        break;
      }
    }

    if (!foundSub) {
      flat.push(op);
    }
  }

  return { flat, nested };
}

// Generate the client.ts file content
function generateClientCode(namespaces: Map<string, OperationInfo[]>): string {
  // Collect all function imports
  const allFunctions: string[] = [];
  for (const operations of namespaces.values()) {
    for (const op of operations) {
      if (!allFunctions.includes(op.functionName)) {
        allFunctions.push(op.functionName);
      }
    }
  }
  allFunctions.sort();

  // Generate imports
  const imports = `import {
  client,
${allFunctions.map(f => `  ${f},`).join('\n')}
} from './generated/sdk.gen';

import { LateApiError, parseApiError } from './errors';`;

  // Generate interface
  const interfaceCode = `
export interface ClientOptions {
  /**
   * API key for authentication. Defaults to process.env['LATE_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API.
   * @default "https://getlate.dev/api"
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response.
   * @default 60000
   */
  timeout?: number;

  /**
   * Default headers to include with every request.
   */
  defaultHeaders?: Record<string, string>;
}`;

  // Generate namespace properties
  const namespaceProps: string[] = [];

  for (const [namespace, operations] of namespaces.entries()) {
    if (namespace === 'connect') {
      // Special handling for connect with nested namespaces
      const { flat, nested } = organizeConnectNamespace(operations);

      let connectCode = `  /**
   * Connect API - OAuth connection flows
   */
  connect = {`;

      // Add flat methods
      for (const op of flat) {
        connectCode += `\n    ${op.methodName}: ${op.functionName},`;
      }

      // Add nested namespaces
      for (const [subName, subOps] of nested.entries()) {
        connectCode += `\n    ${subName}: {`;
        for (const op of subOps) {
          connectCode += `\n      ${op.methodName}: ${op.functionName},`;
        }
        connectCode += `\n    },`;
      }

      connectCode += `\n  };`;
      namespaceProps.push(connectCode);
    } else {
      // Regular namespace
      const comment = getNamespaceComment(namespace);
      let code = `  /**
   * ${comment}
   */
  ${namespace} = {`;

      for (const op of operations) {
        code += `\n    ${op.methodName}: ${op.functionName},`;
      }

      code += `\n  };`;
      namespaceProps.push(code);
    }
  }

  // Generate class
  const classCode = `
/**
 * API Client for the Late API.
 *
 * @example
 * \`\`\`typescript
 * import Late from '@getlatedev/node';
 *
 * const late = new Late({
 *   apiKey: process.env['LATE_API_KEY'], // This is the default and can be omitted
 * });
 *
 * async function main() {
 *   const post = await late.posts.create({
 *     body: {
 *       content: 'Hello from the Late SDK!',
 *       platforms: [{ platform: 'twitter', accountId: 'acc_123' }],
 *       publishNow: true,
 *     },
 *   });
 *   console.log(post.data);
 * }
 *
 * main();
 * \`\`\`
 */
export class Late {
  private _options: ClientOptions;

  /**
   * API key used for authentication.
   */
  apiKey: string;

  /**
   * Base URL for API requests.
   */
  baseURL: string;

${namespaceProps.join('\n\n')}

  /**
   * Create a new Late API client.
   *
   * @param options - Configuration options for the client
   */
  constructor(options: ClientOptions = {}) {
    const apiKey = options.apiKey ?? process.env['LATE_API_KEY'];

    if (!apiKey) {
      throw new LateApiError(
        "The LATE_API_KEY environment variable is missing or empty; either provide it, or instantiate the Late client with an apiKey option, like new Late({ apiKey: 'sk_...' }).",
        401,
        'missing_api_key'
      );
    }

    this.apiKey = apiKey;
    this.baseURL = options.baseURL ?? 'https://getlate.dev/api';
    this._options = options;

    // Configure the generated client
    client.setConfig({
      baseUrl: this.baseURL,
    });

    // Add auth interceptor
    client.interceptors.request.use((request) => {
      request.headers.set('Authorization', \`Bearer \${this.apiKey}\`);
      if (options.defaultHeaders) {
        for (const [key, value] of Object.entries(options.defaultHeaders)) {
          request.headers.set(key, value);
        }
      }
      return request;
    });

    // Add error handling interceptor
    client.interceptors.response.use(async (response) => {
      if (!response.ok) {
        let body: Record<string, unknown> | undefined;
        try {
          body = (await response.clone().json()) as Record<string, unknown>;
        } catch {
          // Ignore JSON parse errors
        }
        throw parseApiError(response, body);
      }
      return response;
    });
  }
}

// Default export for convenient usage
export default Late;
`;

  return imports + interfaceCode + classCode;
}

function getNamespaceComment(namespace: string): string {
  const comments: Record<string, string> = {
    'posts': 'Posts API - Create, schedule, and manage social media posts',
    'accounts': 'Accounts API - Manage connected social media accounts',
    'profiles': 'Profiles API - Manage workspace profiles',
    'analytics': 'Analytics API - Get performance metrics',
    'accountGroups': 'Account Groups API - Organize accounts into groups',
    'queue': 'Queue API - Manage posting queue',
    'webhooks': 'Webhooks API - Configure event webhooks',
    'apiKeys': 'API Keys API - Manage API keys',
    'media': 'Media API - Upload and manage media files',
    'tools': 'Tools API - Media download and utilities',
    'users': 'Users API - User management',
    'usage': 'Usage API - Get usage statistics',
    'logs': 'Logs API - Publishing logs',
    'connect': 'Connect API - OAuth connection flows',
    'reddit': 'Reddit API - Search and feed',
    'invites': 'Invites API - Team invitations',
  };
  return comments[namespace] || `${namespace} API`;
}

// Main execution
async function main() {
  const specPath = path.join(__dirname, '..', 'openapi.yaml');

  if (!fs.existsSync(specPath)) {
    console.error('OpenAPI spec not found at', specPath);
    console.error('Run "npm run fetch-spec" first');
    process.exit(1);
  }

  const specContent = fs.readFileSync(specPath, 'utf-8');
  const spec = yaml.parse(specContent) as OpenAPISpec;

  const namespaces = groupOperationsByNamespace(spec);
  const clientCode = generateClientCode(namespaces);

  const outputPath = path.join(__dirname, '..', 'src', 'client.ts');
  fs.writeFileSync(outputPath, clientCode);

  console.log('Generated client.ts with', namespaces.size, 'namespaces');
  for (const [name, ops] of namespaces.entries()) {
    console.log(`  - ${name}: ${ops.length} methods`);
  }
}

main().catch(console.error);
