import {
  client,
  activateSequence,
  addBroadcastRecipients,
  addMessageReaction,
  addUsersToAdAudience,
  addWhatsAppGroupParticipants,
  approveWhatsAppGroupJoinRequests,
  batchGetGoogleBusinessReviews,
  bookmarkPost,
  boostPost,
  bulkCreateContacts,
  bulkUpdateAdCampaignStatus,
  bulkUploadPosts,
  cancelBroadcast,
  clearContactFieldValue,
  completeTelegramConnect,
  connectAds,
  connectBlueskyCredentials,
  connectWhatsAppCredentials,
  createAccountGroup,
  createAdAudience,
  createApiKey,
  createBroadcast,
  createCommentAutomation,
  createContact,
  createCtwaAd,
  createCustomField,
  createGoogleBusinessMedia,
  createGoogleBusinessPlaceAction,
  createInboxConversation,
  createInviteToken,
  createPost,
  createProfile,
  createQueueSlot,
  createSequence,
  createStandaloneAd,
  createWebhookSettings,
  createWhatsAppFlow,
  createWhatsAppGroupChat,
  createWhatsAppGroupInviteLink,
  createWhatsAppTemplate,
  deleteAccount,
  deleteAccountGroup,
  deleteAd,
  deleteAdAudience,
  deleteAdCampaign,
  deleteApiKey,
  deleteBroadcast,
  deleteCommentAutomation,
  deleteContact,
  deleteCustomField,
  deleteGoogleBusinessMedia,
  deleteGoogleBusinessPlaceAction,
  deleteInboxComment,
  deleteInboxMessage,
  deleteInboxReviewReply,
  deleteInstagramIceBreakers,
  deleteMessengerMenu,
  deletePost,
  deleteProfile,
  deleteQueueSlot,
  deleteSequence,
  deleteTelegramCommands,
  deleteWebhookSettings,
  deleteWhatsAppFlow,
  deleteWhatsAppGroupChat,
  deleteWhatsAppTemplate,
  deprecateWhatsAppFlow,
  duplicateAdCampaign,
  editInboxMessage,
  editPost,
  enrollContacts,
  followUser,
  getAccountHealth,
  getAd,
  getAdAnalytics,
  getAdAudience,
  getAdComments,
  getAdTree,
  getAllAccountsHealth,
  getAnalytics,
  getBestTimeToPost,
  getBroadcast,
  getCommentAutomation,
  getConnectUrl,
  getContact,
  getContactChannels,
  getContentDecay,
  getDailyMetrics,
  getDiscordChannels,
  getDiscordSettings,
  getFacebookPageInsights,
  getFacebookPages,
  getFollowerStats,
  getGmbLocations,
  getGoogleBusinessAttributes,
  getGoogleBusinessFoodMenus,
  getGoogleBusinessLocationDetails,
  getGoogleBusinessPerformance,
  getGoogleBusinessReviews,
  getGoogleBusinessSearchKeywords,
  getGoogleBusinessServices,
  getInboxConversation,
  getInboxConversationMessages,
  getInboxPostComments,
  getInstagramAccountInsights,
  getInstagramDemographics,
  getInstagramFollowerHistory,
  getInstagramIceBreakers,
  getLinkedInAggregateAnalytics,
  getLinkedInMentions,
  getLinkedInOrgAggregateAnalytics,
  getLinkedInOrganizations,
  getLinkedInPostAnalytics,
  getLinkedInPostReactions,
  getMediaPresignedUrl,
  getMessengerMenu,
  getNextQueueSlot,
  getPendingOAuthData,
  getPinterestBoards,
  getPost,
  getPostTimeline,
  getPostingFrequency,
  getProfile,
  getRedditFeed,
  getRedditFlairs,
  getRedditSubreddits,
  getSequence,
  getTelegramCommands,
  getTelegramConnectStatus,
  getTikTokAccountInsights,
  getTikTokCreatorInfo,
  getUsageStats,
  getUser,
  getWebhookSettings,
  getWhatsAppBusinessProfile,
  getWhatsAppDisplayName,
  getWhatsAppFlow,
  getWhatsAppFlowJson,
  getWhatsAppGroupChat,
  getWhatsAppPhoneNumber,
  getWhatsAppPhoneNumbers,
  getWhatsAppTemplate,
  getWhatsAppTemplates,
  getYouTubeChannelInsights,
  getYouTubeDailyViews,
  getYouTubeDemographics,
  getYoutubePlaylists,
  handleOAuthCallback,
  hideInboxComment,
  initiateTelegramConnect,
  likeInboxComment,
  listAccountGroups,
  listAccounts,
  listAdAccounts,
  listAdAudiences,
  listAdCampaigns,
  listAds,
  listAdsBusinessCenters,
  listApiKeys,
  listBroadcastRecipients,
  listBroadcasts,
  listCommentAutomationLogs,
  listCommentAutomations,
  listContacts,
  listConversionDestinations,
  listCustomFields,
  listFacebookPages,
  listGoogleBusinessLocations,
  listGoogleBusinessMedia,
  listGoogleBusinessPlaceActions,
  listInboxComments,
  listInboxConversations,
  listInboxReviews,
  listLinkedInOrganizations,
  listLogs,
  listPinterestBoardsForSelection,
  listPosts,
  listProfiles,
  listQueueSlots,
  listSequenceEnrollments,
  listSequences,
  listSnapchatProfiles,
  listUsers,
  listWhatsAppFlows,
  listWhatsAppGroupChats,
  listWhatsAppGroupJoinRequests,
  pauseSequence,
  previewQueue,
  publishWhatsAppFlow,
  purchaseWhatsAppPhoneNumber,
  rejectWhatsAppGroupJoinRequests,
  releaseWhatsAppPhoneNumber,
  removeBookmark,
  removeMessageReaction,
  removeWhatsAppGroupParticipants,
  replyToInboxPost,
  replyToInboxReview,
  retryPost,
  retweetPost,
  scheduleBroadcast,
  searchAdInterests,
  searchAdTargetingLocations,
  searchReddit,
  selectFacebookPage,
  selectGoogleBusinessLocation,
  selectLinkedInOrganization,
  selectPinterestBoard,
  selectSnapchatProfile,
  sendBroadcast,
  sendConversions,
  sendInboxMessage,
  sendPrivateReplyToComment,
  sendTypingIndicator,
  sendWhatsAppConversion,
  sendWhatsAppFlowMessage,
  setContactFieldValue,
  setInstagramIceBreakers,
  setMessengerMenu,
  setTelegramCommands,
  testWebhook,
  undoRetweet,
  unenrollContact,
  unfollowUser,
  unhideInboxComment,
  unlikeInboxComment,
  unpublishPost,
  updateAccount,
  updateAccountGroup,
  updateAd,
  updateAdCampaign,
  updateAdCampaignStatus,
  updateAdSet,
  updateAdSetStatus,
  updateBroadcast,
  updateCommentAutomation,
  updateContact,
  updateCustomField,
  updateDiscordSettings,
  updateFacebookPage,
  updateGmbLocation,
  updateGoogleBusinessAttributes,
  updateGoogleBusinessFoodMenus,
  updateGoogleBusinessLocationDetails,
  updateGoogleBusinessPlaceAction,
  updateGoogleBusinessServices,
  updateInboxConversation,
  updateLinkedInOrganization,
  updatePinterestBoards,
  updatePost,
  updatePostMetadata,
  updateProfile,
  updateQueueSlot,
  updateRedditSubreddits,
  updateSequence,
  updateWebhookSettings,
  updateWhatsAppBusinessProfile,
  updateWhatsAppDisplayName,
  updateWhatsAppFlow,
  updateWhatsAppGroupChat,
  updateWhatsAppTemplate,
  updateYoutubeDefaultPlaylist,
  uploadMediaDirect,
  uploadWhatsAppFlowJson,
  uploadWhatsAppProfilePhoto,
  validateMedia,
  validatePost,
  validatePostLength,
  validateSubreddit,
} from './generated/sdk.gen';

import { ZernioApiError, parseApiError } from './errors';
export interface ClientOptions {
  /**
   * API key for authentication. Defaults to process.env['ZERNIO_API_KEY'] (falls back to LATE_API_KEY).
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API.
   * @default "https://zernio.com/api"
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
 * API Client for the Zernio API.
 *
 * @example
 * ```typescript
 * import Zernio from '@zernio/node';
 *
 * const zernio = new Zernio({
 *   apiKey: process.env['ZERNIO_API_KEY'], // This is the default and can be omitted
 * });
 *
 * async function main() {
 *   const post = await zernio.posts.create({
 *     body: {
 *       content: 'Hello from the Zernio SDK!',
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
export class Zernio {
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
    getYouTubeChannelInsights: getYouTubeChannelInsights,
    getLinkedInOrgAggregateAnalytics: getLinkedInOrgAggregateAnalytics,
    getTikTokAccountInsights: getTikTokAccountInsights,
    getYouTubeDailyViews: getYouTubeDailyViews,
    getFacebookPageInsights: getFacebookPageInsights,
    getInstagramAccountInsights: getInstagramAccountInsights,
    getInstagramFollowerHistory: getInstagramFollowerHistory,
    getInstagramDemographics: getInstagramDemographics,
    getYouTubeDemographics: getYouTubeDemographics,
    getDailyMetrics: getDailyMetrics,
    getBestTimeToPost: getBestTimeToPost,
    getContentDecay: getContentDecay,
    getPostingFrequency: getPostingFrequency,
    getPostTimeline: getPostTimeline,
    getGoogleBusinessPerformance: getGoogleBusinessPerformance,
    getGoogleBusinessSearchKeywords: getGoogleBusinessSearchKeywords,
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
    editPost: editPost,
    updatePostMetadata: updatePostMetadata,
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
    getTikTokCreatorInfo: getTikTokCreatorInfo,
    getGoogleBusinessReviews: getGoogleBusinessReviews,
    batchGetGoogleBusinessReviews: batchGetGoogleBusinessReviews,
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
    connectAds: connectAds,
    getPendingOAuthData: getPendingOAuthData,
    connectWhatsAppCredentials: connectWhatsAppCredentials,
    getFacebookPages: getFacebookPages,
    updateFacebookPage: updateFacebookPage,
    getLinkedInOrganizations: getLinkedInOrganizations,
    updateLinkedInOrganization: updateLinkedInOrganization,
    getPinterestBoards: getPinterestBoards,
    updatePinterestBoards: updatePinterestBoards,
    getYoutubePlaylists: getYoutubePlaylists,
    updateYoutubeDefaultPlaylist: updateYoutubeDefaultPlaylist,
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
    updateGoogleBusinessPlaceAction: updateGoogleBusinessPlaceAction,
  };

  /**
   * gmbservices API
   */
  gmbservices = {
    getGoogleBusinessServices: getGoogleBusinessServices,
    updateGoogleBusinessServices: updateGoogleBusinessServices,
  };

  /**
   * discord API
   */
  discord = {
    getDiscordSettings: getDiscordSettings,
    updateDiscordSettings: updateDiscordSettings,
    getDiscordChannels: getDiscordChannels,
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
  };

  /**
   * Logs API - Publishing logs
   */
  logs = {
    listLogs: listLogs,
  };

  /**
   * messages API
   */
  messages = {
    listInboxConversations: listInboxConversations,
    createInboxConversation: createInboxConversation,
    getInboxConversation: getInboxConversation,
    updateInboxConversation: updateInboxConversation,
    getInboxConversationMessages: getInboxConversationMessages,
    sendInboxMessage: sendInboxMessage,
    editInboxMessage: editInboxMessage,
    deleteInboxMessage: deleteInboxMessage,
    sendTypingIndicator: sendTypingIndicator,
    addMessageReaction: addMessageReaction,
    removeMessageReaction: removeMessageReaction,
    uploadMediaDirect: uploadMediaDirect,
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
    getWhatsAppTemplates: getWhatsAppTemplates,
    createWhatsAppTemplate: createWhatsAppTemplate,
    getWhatsAppTemplate: getWhatsAppTemplate,
    updateWhatsAppTemplate: updateWhatsAppTemplate,
    deleteWhatsAppTemplate: deleteWhatsAppTemplate,
    getWhatsAppBusinessProfile: getWhatsAppBusinessProfile,
    updateWhatsAppBusinessProfile: updateWhatsAppBusinessProfile,
    uploadWhatsAppProfilePhoto: uploadWhatsAppProfilePhoto,
    getWhatsAppDisplayName: getWhatsAppDisplayName,
    updateWhatsAppDisplayName: updateWhatsAppDisplayName,
    listWhatsAppGroupChats: listWhatsAppGroupChats,
    createWhatsAppGroupChat: createWhatsAppGroupChat,
    getWhatsAppGroupChat: getWhatsAppGroupChat,
    updateWhatsAppGroupChat: updateWhatsAppGroupChat,
    deleteWhatsAppGroupChat: deleteWhatsAppGroupChat,
    addWhatsAppGroupParticipants: addWhatsAppGroupParticipants,
    removeWhatsAppGroupParticipants: removeWhatsAppGroupParticipants,
    createWhatsAppGroupInviteLink: createWhatsAppGroupInviteLink,
    listWhatsAppGroupJoinRequests: listWhatsAppGroupJoinRequests,
    approveWhatsAppGroupJoinRequests: approveWhatsAppGroupJoinRequests,
    rejectWhatsAppGroupJoinRequests: rejectWhatsAppGroupJoinRequests,
    sendWhatsAppConversion: sendWhatsAppConversion,
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
   * whatsappflows API
   */
  whatsappflows = {
    listWhatsAppFlows: listWhatsAppFlows,
    createWhatsAppFlow: createWhatsAppFlow,
    getWhatsAppFlow: getWhatsAppFlow,
    updateWhatsAppFlow: updateWhatsAppFlow,
    deleteWhatsAppFlow: deleteWhatsAppFlow,
    getWhatsAppFlowJson: getWhatsAppFlowJson,
    uploadWhatsAppFlowJson: uploadWhatsAppFlowJson,
    publishWhatsAppFlow: publishWhatsAppFlow,
    deprecateWhatsAppFlow: deprecateWhatsAppFlow,
    sendWhatsAppFlowMessage: sendWhatsAppFlowMessage,
  };

  /**
   * contacts API
   */
  contacts = {
    listContacts: listContacts,
    createContact: createContact,
    getContact: getContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    getContactChannels: getContactChannels,
    bulkCreateContacts: bulkCreateContacts,
  };

  /**
   * customfields API
   */
  customfields = {
    setContactFieldValue: setContactFieldValue,
    clearContactFieldValue: clearContactFieldValue,
    listCustomFields: listCustomFields,
    createCustomField: createCustomField,
    updateCustomField: updateCustomField,
    deleteCustomField: deleteCustomField,
  };

  /**
   * broadcasts API
   */
  broadcasts = {
    listBroadcasts: listBroadcasts,
    createBroadcast: createBroadcast,
    getBroadcast: getBroadcast,
    updateBroadcast: updateBroadcast,
    deleteBroadcast: deleteBroadcast,
    sendBroadcast: sendBroadcast,
    scheduleBroadcast: scheduleBroadcast,
    cancelBroadcast: cancelBroadcast,
    listBroadcastRecipients: listBroadcastRecipients,
    addBroadcastRecipients: addBroadcastRecipients,
  };

  /**
   * sequences API
   */
  sequences = {
    listSequences: listSequences,
    createSequence: createSequence,
    getSequence: getSequence,
    updateSequence: updateSequence,
    deleteSequence: deleteSequence,
    activateSequence: activateSequence,
    pauseSequence: pauseSequence,
    enrollContacts: enrollContacts,
    unenrollContact: unenrollContact,
    listSequenceEnrollments: listSequenceEnrollments,
  };

  /**
   * commentautomations API
   */
  commentautomations = {
    listCommentAutomations: listCommentAutomations,
    createCommentAutomation: createCommentAutomation,
    getCommentAutomation: getCommentAutomation,
    updateCommentAutomation: updateCommentAutomation,
    deleteCommentAutomation: deleteCommentAutomation,
    listCommentAutomationLogs: listCommentAutomationLogs,
  };

  /**
   * ads API
   */
  ads = {
    listAds: listAds,
    getAd: getAd,
    updateAd: updateAd,
    deleteAd: deleteAd,
    getAdAnalytics: getAdAnalytics,
    getAdComments: getAdComments,
    listAdsBusinessCenters: listAdsBusinessCenters,
    listAdAccounts: listAdAccounts,
    boostPost: boostPost,
    createStandaloneAd: createStandaloneAd,
    searchAdInterests: searchAdInterests,
    searchAdTargetingLocations: searchAdTargetingLocations,
    sendConversions: sendConversions,
    listConversionDestinations: listConversionDestinations,
    createCtwaAd: createCtwaAd,
  };

  /**
   * adcampaigns API
   */
  adcampaigns = {
    listAdCampaigns: listAdCampaigns,
    updateAdCampaignStatus: updateAdCampaignStatus,
    updateAdCampaign: updateAdCampaign,
    deleteAdCampaign: deleteAdCampaign,
    bulkUpdateAdCampaignStatus: bulkUpdateAdCampaignStatus,
    duplicateAdCampaign: duplicateAdCampaign,
    updateAdSet: updateAdSet,
    updateAdSetStatus: updateAdSetStatus,
    getAdTree: getAdTree,
  };

  /**
   * adaudiences API
   */
  adaudiences = {
    listAdAudiences: listAdAudiences,
    createAdAudience: createAdAudience,
    getAdAudience: getAdAudience,
    deleteAdAudience: deleteAdAudience,
    addUsersToAdAudience: addUsersToAdAudience,
  };

  /**
   * Create a new Zernio API client.
   *
   * @param options - Configuration options for the client
   */
  constructor(options: ClientOptions = {}) {
    // Check ZERNIO_API_KEY first, fall back to LATE_API_KEY for backwards compatibility
    const apiKey = options.apiKey ?? process.env['ZERNIO_API_KEY'] ?? process.env['LATE_API_KEY'];

    if (!apiKey) {
      throw new ZernioApiError(
        "The ZERNIO_API_KEY environment variable is missing or empty; either provide it, or instantiate the Zernio client with an apiKey option, like new Zernio({ apiKey: 'sk_...' }). LATE_API_KEY is also supported for backwards compatibility.",
        401,
        'missing_api_key'
      );
    }

    this.apiKey = apiKey;
    this.baseURL = options.baseURL ?? 'https://zernio.com/api';
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

/** @deprecated Use Zernio instead */
export const Late = Zernio;

// Default export for convenient usage
export default Zernio;
