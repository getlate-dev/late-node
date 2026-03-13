import {
  client,
  addWhatsAppBroadcastRecipients,
  bookmarkPost,
  bulkDeleteWhatsAppContacts,
  bulkUpdateWhatsAppContacts,
  bulkUploadPosts,
  cancelWhatsAppBroadcastSchedule,
  checkInstagramHashtags,
  completeTelegramConnect,
  connectBlueskyCredentials,
  connectWhatsAppCredentials,
  createAccountGroup,
  createApiKey,
  createGoogleBusinessMedia,
  createGoogleBusinessPlaceAction,
  createInviteToken,
  createPost,
  createProfile,
  createQueueSlot,
  createWebhookSettings,
  createWhatsAppBroadcast,
  createWhatsAppContact,
  createWhatsAppTemplate,
  deleteAccount,
  deleteAccountGroup,
  deleteApiKey,
  deleteGoogleBusinessMedia,
  deleteGoogleBusinessPlaceAction,
  deleteInboxComment,
  deleteInboxReviewReply,
  deleteInstagramIceBreakers,
  deleteMessengerMenu,
  deletePost,
  deleteProfile,
  deleteQueueSlot,
  deleteTelegramCommands,
  deleteWebhookSettings,
  deleteWhatsAppBroadcast,
  deleteWhatsAppContact,
  deleteWhatsAppGroup,
  deleteWhatsAppTemplate,
  downloadBlueskyMedia,
  downloadFacebookVideo,
  downloadInstagramMedia,
  downloadLinkedInVideo,
  downloadTikTokVideo,
  downloadTwitterMedia,
  downloadYouTubeVideo,
  editInboxMessage,
  followUser,
  getAccountHealth,
  getAllAccountsHealth,
  getAnalytics,
  getBestTimeToPost,
  getConnectUrl,
  getContentDecay,
  getDailyMetrics,
  getFacebookPages,
  getFollowerStats,
  getGmbLocations,
  getGoogleBusinessAttributes,
  getGoogleBusinessFoodMenus,
  getGoogleBusinessLocationDetails,
  getGoogleBusinessReviews,
  getInboxConversation,
  getInboxConversationMessages,
  getInboxPostComments,
  getInstagramIceBreakers,
  getLinkedInAggregateAnalytics,
  getLinkedInMentions,
  getLinkedInOrganizations,
  getLinkedInPostAnalytics,
  getLinkedInPostReactions,
  getMediaPresignedUrl,
  getMessengerMenu,
  getNextQueueSlot,
  getPendingOAuthData,
  getPinterestBoards,
  getPost,
  getPostLogs,
  getPostTimeline,
  getPostingFrequency,
  getProfile,
  getRedditFeed,
  getRedditFlairs,
  getRedditSubreddits,
  getTelegramCommands,
  getTelegramConnectStatus,
  getUsageStats,
  getUser,
  getWebhookLogs,
  getWebhookSettings,
  getWhatsAppBroadcast,
  getWhatsAppBroadcastRecipients,
  getWhatsAppBroadcasts,
  getWhatsAppBusinessProfile,
  getWhatsAppContact,
  getWhatsAppContacts,
  getWhatsAppDisplayName,
  getWhatsAppGroups,
  getWhatsAppPhoneNumber,
  getWhatsAppPhoneNumbers,
  getWhatsAppTemplate,
  getWhatsAppTemplates,
  getYouTubeDailyViews,
  getYouTubeTranscript,
  handleOAuthCallback,
  hideInboxComment,
  importWhatsAppContacts,
  initiateTelegramConnect,
  likeInboxComment,
  listAccountGroups,
  listAccounts,
  listApiKeys,
  listConnectionLogs,
  listFacebookPages,
  listGoogleBusinessLocations,
  listGoogleBusinessMedia,
  listGoogleBusinessPlaceActions,
  listInboxComments,
  listInboxConversations,
  listInboxReviews,
  listLinkedInOrganizations,
  listPinterestBoardsForSelection,
  listPosts,
  listPostsLogs,
  listProfiles,
  listQueueSlots,
  listSnapchatProfiles,
  listUsers,
  previewQueue,
  purchaseWhatsAppPhoneNumber,
  releaseWhatsAppPhoneNumber,
  removeBookmark,
  removeWhatsAppBroadcastRecipients,
  renameWhatsAppGroup,
  replyToInboxPost,
  replyToInboxReview,
  retryPost,
  retweetPost,
  scheduleWhatsAppBroadcast,
  searchReddit,
  selectFacebookPage,
  selectGoogleBusinessLocation,
  selectLinkedInOrganization,
  selectPinterestBoard,
  selectSnapchatProfile,
  sendInboxMessage,
  sendPrivateReplyToComment,
  sendWhatsAppBroadcast,
  sendWhatsAppBulk,
  setInstagramIceBreakers,
  setMessengerMenu,
  setTelegramCommands,
  testWebhook,
  undoRetweet,
  unfollowUser,
  unhideInboxComment,
  unlikeInboxComment,
  unpublishPost,
  updateAccount,
  updateAccountGroup,
  updateFacebookPage,
  updateGmbLocation,
  updateGoogleBusinessAttributes,
  updateGoogleBusinessFoodMenus,
  updateGoogleBusinessLocationDetails,
  updateInboxConversation,
  updateLinkedInOrganization,
  updatePinterestBoards,
  updatePost,
  updateProfile,
  updateQueueSlot,
  updateRedditSubreddits,
  updateWebhookSettings,
  updateWhatsAppBusinessProfile,
  updateWhatsAppContact,
  updateWhatsAppDisplayName,
  updateWhatsAppTemplate,
  uploadWhatsAppProfilePhoto,
  validateMedia,
  validatePost,
  validatePostLength,
  validateSubreddit,
} from './generated/sdk.gen';

import { LateApiError, parseApiError } from './errors';
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
}
/**
 * API Client for the Late API.
 *
 * @example
 * ```typescript
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
 * ```
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

  /**
   * Tools API - Media download and utilities
   */
  tools = {
    downloadYouTubeVideo: downloadYouTubeVideo,
    getYouTubeTranscript: getYouTubeTranscript,
    downloadInstagramMedia: downloadInstagramMedia,
    checkInstagramHashtags: checkInstagramHashtags,
    downloadTikTokVideo: downloadTikTokVideo,
    downloadTwitterMedia: downloadTwitterMedia,
    downloadFacebookVideo: downloadFacebookVideo,
    downloadLinkedInVideo: downloadLinkedInVideo,
    downloadBlueskyMedia: downloadBlueskyMedia,
  };

  /**
   * validate API
   */
  validate = {
    validatePostLength: validatePostLength,
    validatePost: validatePost,
    validateMedia: validateMedia,
    validateSubreddit: validateSubreddit,
  };

  /**
   * Analytics API - Get performance metrics
   */
  analytics = {
    getAnalytics: getAnalytics,
    getYouTubeDailyViews: getYouTubeDailyViews,
    getDailyMetrics: getDailyMetrics,
    getBestTimeToPost: getBestTimeToPost,
    getContentDecay: getContentDecay,
    getPostingFrequency: getPostingFrequency,
    getPostTimeline: getPostTimeline,
    getLinkedInAggregateAnalytics: getLinkedInAggregateAnalytics,
    getLinkedInPostAnalytics: getLinkedInPostAnalytics,
    getLinkedInPostReactions: getLinkedInPostReactions,
  };

  /**
   * Account Groups API - Organize accounts into groups
   */
  accountGroups = {
    listAccountGroups: listAccountGroups,
    createAccountGroup: createAccountGroup,
    updateAccountGroup: updateAccountGroup,
    deleteAccountGroup: deleteAccountGroup,
  };

  /**
   * Media API - Upload and manage media files
   */
  media = {
    getMediaPresignedUrl: getMediaPresignedUrl,
  };

  /**
   * Reddit API - Search and feed
   */
  reddit = {
    searchReddit: searchReddit,
    getRedditFeed: getRedditFeed,
  };

  /**
   * Usage API - Get usage statistics
   */
  usage = {
    getUsageStats: getUsageStats,
  };

  /**
   * Posts API - Create, schedule, and manage social media posts
   */
  posts = {
    listPosts: listPosts,
    createPost: createPost,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost,
    bulkUploadPosts: bulkUploadPosts,
    retryPost: retryPost,
    unpublishPost: unpublishPost,
  };

  /**
   * Users API - User management
   */
  users = {
    listUsers: listUsers,
    getUser: getUser,
  };

  /**
   * Profiles API - Manage workspace profiles
   */
  profiles = {
    listProfiles: listProfiles,
    createProfile: createProfile,
    getProfile: getProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,
  };

  /**
   * Accounts API - Manage connected social media accounts
   */
  accounts = {
    listAccounts: listAccounts,
    getFollowerStats: getFollowerStats,
    updateAccount: updateAccount,
    deleteAccount: deleteAccount,
    getAllAccountsHealth: getAllAccountsHealth,
    getAccountHealth: getAccountHealth,
    getGoogleBusinessReviews: getGoogleBusinessReviews,
    getLinkedInMentions: getLinkedInMentions,
  };

  /**
   * API Keys API - Manage API keys
   */
  apiKeys = {
    listApiKeys: listApiKeys,
    createApiKey: createApiKey,
    deleteApiKey: deleteApiKey,
  };

  /**
   * Invites API - Team invitations
   */
  invites = {
    createInviteToken: createInviteToken,
  };

  /**
   * Connect API - OAuth connection flows
   */
  connect = {
    getConnectUrl: getConnectUrl,
    handleOAuthCallback: handleOAuthCallback,
    getPendingOAuthData: getPendingOAuthData,
    connectWhatsAppCredentials: connectWhatsAppCredentials,
    getFacebookPages: getFacebookPages,
    updateFacebookPage: updateFacebookPage,
    getLinkedInOrganizations: getLinkedInOrganizations,
    updateLinkedInOrganization: updateLinkedInOrganization,
    getPinterestBoards: getPinterestBoards,
    updatePinterestBoards: updatePinterestBoards,
    getGmbLocations: getGmbLocations,
    updateGmbLocation: updateGmbLocation,
    getRedditSubreddits: getRedditSubreddits,
    updateRedditSubreddits: updateRedditSubreddits,
    getRedditFlairs: getRedditFlairs,
    facebook: {
      listFacebookPages: listFacebookPages,
      selectFacebookPage: selectFacebookPage,
    },
    googleBusiness: {
      listGoogleBusinessLocations: listGoogleBusinessLocations,
      selectGoogleBusinessLocation: selectGoogleBusinessLocation,
    },
    linkedin: {
      listLinkedInOrganizations: listLinkedInOrganizations,
      selectLinkedInOrganization: selectLinkedInOrganization,
    },
    pinterest: {
      listPinterestBoardsForSelection: listPinterestBoardsForSelection,
      selectPinterestBoard: selectPinterestBoard,
    },
    snapchat: {
      listSnapchatProfiles: listSnapchatProfiles,
      selectSnapchatProfile: selectSnapchatProfile,
    },
    bluesky: {
      connectBlueskyCredentials: connectBlueskyCredentials,
    },
    telegram: {
      getTelegramConnectStatus: getTelegramConnectStatus,
      initiateTelegramConnect: initiateTelegramConnect,
      completeTelegramConnect: completeTelegramConnect,
    },
  };

  /**
   * gmbfoodmenus API
   */
  gmbfoodmenus = {
    getGoogleBusinessFoodMenus: getGoogleBusinessFoodMenus,
    updateGoogleBusinessFoodMenus: updateGoogleBusinessFoodMenus,
  };

  /**
   * gmblocationdetails API
   */
  gmblocationdetails = {
    getGoogleBusinessLocationDetails: getGoogleBusinessLocationDetails,
    updateGoogleBusinessLocationDetails: updateGoogleBusinessLocationDetails,
  };

  /**
   * gmbmedia API
   */
  gmbmedia = {
    listGoogleBusinessMedia: listGoogleBusinessMedia,
    createGoogleBusinessMedia: createGoogleBusinessMedia,
    deleteGoogleBusinessMedia: deleteGoogleBusinessMedia,
  };

  /**
   * gmbattributes API
   */
  gmbattributes = {
    getGoogleBusinessAttributes: getGoogleBusinessAttributes,
    updateGoogleBusinessAttributes: updateGoogleBusinessAttributes,
  };

  /**
   * gmbplaceactions API
   */
  gmbplaceactions = {
    listGoogleBusinessPlaceActions: listGoogleBusinessPlaceActions,
    createGoogleBusinessPlaceAction: createGoogleBusinessPlaceAction,
    deleteGoogleBusinessPlaceAction: deleteGoogleBusinessPlaceAction,
  };

  /**
   * Queue API - Manage posting queue
   */
  queue = {
    listQueueSlots: listQueueSlots,
    createQueueSlot: createQueueSlot,
    updateQueueSlot: updateQueueSlot,
    deleteQueueSlot: deleteQueueSlot,
    previewQueue: previewQueue,
    getNextQueueSlot: getNextQueueSlot,
  };

  /**
   * Webhooks API - Configure event webhooks
   */
  webhooks = {
    getWebhookSettings: getWebhookSettings,
    createWebhookSettings: createWebhookSettings,
    updateWebhookSettings: updateWebhookSettings,
    deleteWebhookSettings: deleteWebhookSettings,
    testWebhook: testWebhook,
    getWebhookLogs: getWebhookLogs,
  };

  /**
   * Logs API - Publishing logs
   */
  logs = {
    listPostsLogs: listPostsLogs,
    listConnectionLogs: listConnectionLogs,
    getPostLogs: getPostLogs,
  };

  /**
   * messages API
   */
  messages = {
    listInboxConversations: listInboxConversations,
    getInboxConversation: getInboxConversation,
    updateInboxConversation: updateInboxConversation,
    getInboxConversationMessages: getInboxConversationMessages,
    sendInboxMessage: sendInboxMessage,
    editInboxMessage: editInboxMessage,
  };

  /**
   * accountsettings API
   */
  accountsettings = {
    getMessengerMenu: getMessengerMenu,
    setMessengerMenu: setMessengerMenu,
    deleteMessengerMenu: deleteMessengerMenu,
    getInstagramIceBreakers: getInstagramIceBreakers,
    setInstagramIceBreakers: setInstagramIceBreakers,
    deleteInstagramIceBreakers: deleteInstagramIceBreakers,
    getTelegramCommands: getTelegramCommands,
    setTelegramCommands: setTelegramCommands,
    deleteTelegramCommands: deleteTelegramCommands,
  };

  /**
   * comments API
   */
  comments = {
    listInboxComments: listInboxComments,
    getInboxPostComments: getInboxPostComments,
    replyToInboxPost: replyToInboxPost,
    deleteInboxComment: deleteInboxComment,
    hideInboxComment: hideInboxComment,
    unhideInboxComment: unhideInboxComment,
    likeInboxComment: likeInboxComment,
    unlikeInboxComment: unlikeInboxComment,
    sendPrivateReplyToComment: sendPrivateReplyToComment,
  };

  /**
   * twitterengagement API
   */
  twitterengagement = {
    retweetPost: retweetPost,
    undoRetweet: undoRetweet,
    bookmarkPost: bookmarkPost,
    removeBookmark: removeBookmark,
    followUser: followUser,
    unfollowUser: unfollowUser,
  };

  /**
   * reviews API
   */
  reviews = {
    listInboxReviews: listInboxReviews,
    replyToInboxReview: replyToInboxReview,
    deleteInboxReviewReply: deleteInboxReviewReply,
  };

  /**
   * whatsapp API
   */
  whatsapp = {
    sendWhatsAppBulk: sendWhatsAppBulk,
    getWhatsAppContacts: getWhatsAppContacts,
    createWhatsAppContact: createWhatsAppContact,
    getWhatsAppContact: getWhatsAppContact,
    updateWhatsAppContact: updateWhatsAppContact,
    deleteWhatsAppContact: deleteWhatsAppContact,
    importWhatsAppContacts: importWhatsAppContacts,
    bulkUpdateWhatsAppContacts: bulkUpdateWhatsAppContacts,
    bulkDeleteWhatsAppContacts: bulkDeleteWhatsAppContacts,
    getWhatsAppGroups: getWhatsAppGroups,
    renameWhatsAppGroup: renameWhatsAppGroup,
    deleteWhatsAppGroup: deleteWhatsAppGroup,
    getWhatsAppTemplates: getWhatsAppTemplates,
    createWhatsAppTemplate: createWhatsAppTemplate,
    getWhatsAppTemplate: getWhatsAppTemplate,
    updateWhatsAppTemplate: updateWhatsAppTemplate,
    deleteWhatsAppTemplate: deleteWhatsAppTemplate,
    getWhatsAppBroadcasts: getWhatsAppBroadcasts,
    createWhatsAppBroadcast: createWhatsAppBroadcast,
    getWhatsAppBroadcast: getWhatsAppBroadcast,
    deleteWhatsAppBroadcast: deleteWhatsAppBroadcast,
    sendWhatsAppBroadcast: sendWhatsAppBroadcast,
    scheduleWhatsAppBroadcast: scheduleWhatsAppBroadcast,
    cancelWhatsAppBroadcastSchedule: cancelWhatsAppBroadcastSchedule,
    getWhatsAppBroadcastRecipients: getWhatsAppBroadcastRecipients,
    addWhatsAppBroadcastRecipients: addWhatsAppBroadcastRecipients,
    removeWhatsAppBroadcastRecipients: removeWhatsAppBroadcastRecipients,
    getWhatsAppBusinessProfile: getWhatsAppBusinessProfile,
    updateWhatsAppBusinessProfile: updateWhatsAppBusinessProfile,
    uploadWhatsAppProfilePhoto: uploadWhatsAppProfilePhoto,
    getWhatsAppDisplayName: getWhatsAppDisplayName,
    updateWhatsAppDisplayName: updateWhatsAppDisplayName,
  };

  /**
   * whatsappphonenumbers API
   */
  whatsappphonenumbers = {
    getWhatsAppPhoneNumbers: getWhatsAppPhoneNumbers,
    purchaseWhatsAppPhoneNumber: purchaseWhatsAppPhoneNumber,
    getWhatsAppPhoneNumber: getWhatsAppPhoneNumber,
    releaseWhatsAppPhoneNumber: releaseWhatsAppPhoneNumber,
  };

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
      request.headers.set('Authorization', `Bearer ${this.apiKey}`);
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
