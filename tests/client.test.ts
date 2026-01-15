import { describe, it, expect } from 'vitest';
import Late, { LateApiError } from '../src';

describe('Late Client', () => {
  it('should throw error when no API key is provided', () => {
    const originalEnv = process.env['LATE_API_KEY'];
    delete process.env['LATE_API_KEY'];

    expect(() => new Late()).toThrow(LateApiError);
    expect(() => new Late()).toThrow('LATE_API_KEY');

    process.env['LATE_API_KEY'] = originalEnv;
  });

  it('should create client with provided API key', () => {
    const client = new Late({ apiKey: 'test_key' });
    expect(client.apiKey).toBe('test_key');
  });

  it('should use default base URL', () => {
    const client = new Late({ apiKey: 'test_key' });
    expect(client.baseURL).toBe('https://getlate.dev/api');
  });

  it('should allow custom base URL', () => {
    const client = new Late({
      apiKey: 'test_key',
      baseURL: 'https://custom.example.com/api',
    });
    expect(client.baseURL).toBe('https://custom.example.com/api');
  });

  it('should have all resource namespaces', () => {
    const client = new Late({ apiKey: 'test_key' });

    expect(client.posts).toBeDefined();
    expect(client.accounts).toBeDefined();
    expect(client.profiles).toBeDefined();
    expect(client.analytics).toBeDefined();
    expect(client.accountGroups).toBeDefined();
    expect(client.queue).toBeDefined();
    expect(client.webhooks).toBeDefined();
    expect(client.apiKeys).toBeDefined();
    expect(client.media).toBeDefined();
    expect(client.tools).toBeDefined();
    expect(client.users).toBeDefined();
    expect(client.usage).toBeDefined();
    expect(client.logs).toBeDefined();
    expect(client.connect).toBeDefined();
    expect(client.reddit).toBeDefined();
    expect(client.invites).toBeDefined();
  });

  it('should have posts methods', () => {
    const client = new Late({ apiKey: 'test_key' });

    // Method names come from operationIds in OpenAPI spec
    expect(client.posts.listPosts).toBeTypeOf('function');
    expect(client.posts.createPost).toBeTypeOf('function');
    expect(client.posts.getPost).toBeTypeOf('function');
    expect(client.posts.updatePost).toBeTypeOf('function');
    expect(client.posts.deletePost).toBeTypeOf('function');
    expect(client.posts.retryPost).toBeTypeOf('function');
    expect(client.posts.bulkUploadPosts).toBeTypeOf('function');
  });
});

describe('Error classes', () => {
  it('should export LateApiError', () => {
    expect(LateApiError).toBeDefined();
  });

  it('should create LateApiError with correct properties', () => {
    const error = new LateApiError('Test error', 400, 'test_code');
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('test_code');
    expect(error.name).toBe('LateApiError');
  });
});
