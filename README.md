<p align="center">
  <a href="https://zernio.com">
    <img src="https://zernio.com/brand/icon-primary.png" alt="Zernio" width="60">
  </a>
</p>

<h1 align="center">Zernio Node.js SDK</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@zernio/node"><img src="https://img.shields.io/npm/v/@zernio/node.svg" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="License"></a>
</p>

<p align="center">
  <strong>One API to post everywhere. 14 platforms, zero headaches.</strong>
</p>

The official Node.js SDK for the [Zernio API](https://zernio.com) — schedule and publish social media posts across Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, Bluesky, Reddit, Snapchat, Telegram, WhatsApp, and Google Business Profile with a single integration.

## Installation

```bash
npm install @zernio/node
```

## Quick Start

```typescript
import Zernio from '@zernio/node';

const zernio = new Zernio(); // Uses ZERNIO_API_KEY env var

// Publish to multiple platforms with one call
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'Hello world from Zernio!',
    platforms: [
      { platform: 'twitter', accountId: 'acc_xxx' },
      { platform: 'linkedin', accountId: 'acc_yyy' },
      { platform: 'instagram', accountId: 'acc_zzz' },
    ],
    publishNow: true,
  },
});

console.log(`Published to ${post.platforms.length} platforms!`);
```

## Configuration

```typescript
const zernio = new Zernio({
  apiKey: 'your-api-key', // Defaults to process.env['ZERNIO_API_KEY']
  baseURL: 'https://zernio.com/api',
  timeout: 60000,
});
```

## Examples

### Schedule a Post

```typescript
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'This post will go live tomorrow at 10am',
    platforms: [{ platform: 'instagram', accountId: 'acc_xxx' }],
    scheduledFor: '2025-02-01T10:00:00Z',
  },
});
```

### Platform-Specific Content

Customize content per platform while posting to all at once:

```typescript
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'Default content',
    platforms: [
      {
        platform: 'twitter',
        accountId: 'acc_twitter',
        platformSpecificContent: 'Short & punchy for X',
      },
      {
        platform: 'linkedin',
        accountId: 'acc_linkedin',
        platformSpecificContent: 'Professional tone for LinkedIn with more detail.',
      },
    ],
    publishNow: true,
  },
});
```

### Upload Media

```typescript
// 1. Get presigned upload URL
const { data: presign } = await zernio.media.getMediaPresignedUrl({
  body: { filename: 'video.mp4', contentType: 'video/mp4' },
});

// 2. Upload your file
await fetch(presign.uploadUrl, {
  method: 'PUT',
  body: videoBuffer,
  headers: { 'Content-Type': 'video/mp4' },
});

// 3. Create post with media
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'Check out this video!',
    mediaUrls: [presign.publicUrl],
    platforms: [
      { platform: 'tiktok', accountId: 'acc_xxx' },
      { platform: 'youtube', accountId: 'acc_yyy', youtubeTitle: 'My Video' },
    ],
    publishNow: true,
  },
});
```

### Get Analytics

```typescript
const { data } = await zernio.analytics.getAnalytics({
  query: { postId: 'post_xxx' },
});

console.log('Views:', data.analytics.views);
console.log('Likes:', data.analytics.likes);
console.log('Engagement Rate:', data.analytics.engagementRate);
```

### List Connected Accounts

```typescript
const { data } = await zernio.accounts.listAccounts();

for (const account of data.accounts) {
  console.log(`${account.platform}: @${account.username}`);
}
```

## Error Handling

```typescript
import Zernio, { ZernioApiError, RateLimitError, ValidationError } from '@zernio/node';

try {
  await zernio.posts.createPost({ body: { /* ... */ } });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry in ${error.getSecondsUntilReset()}s`);
  } else if (error instanceof ValidationError) {
    console.log('Invalid request:', error.fields);
  } else if (error instanceof ZernioApiError) {
    console.log(`Error ${error.statusCode}: ${error.message}`);
  }
}
```

## SDK Reference

### Posts
| Method | Description |
|--------|-------------|
| `posts.listPosts()` | List posts |
| `posts.bulkUploadPosts()` | Bulk upload from CSV |
| `posts.createPost()` | Create post |
| `posts.getPost()` | Get post |
| `posts.updatePost()` | Update post |
| `posts.updatePostMetadata()` | Update post metadata |
| `posts.deletePost()` | Delete post |
| `posts.editPost()` | Edit published post |
| `posts.retryPost()` | Retry failed post |
| `posts.unpublishPost()` | Unpublish post |

### Accounts
| Method | Description |
|--------|-------------|
| `accounts.getAllAccountsHealth()` | Check accounts health |
| `accounts.listAccounts()` | List accounts |
| `accounts.getAccountHealth()` | Check account health |
| `accounts.getFollowerStats()` | Get follower stats |
| `accounts.getGoogleBusinessReviews()` | Get reviews |
| `accounts.getLinkedInMentions()` | Resolve LinkedIn mention |
| `accounts.getTikTokCreatorInfo()` | Get TikTok creator info |
| `accounts.updateAccount()` | Update account |
| `accounts.deleteAccount()` | Disconnect account |
| `accounts.batchGetGoogleBusinessReviews()` | Batch get reviews |

### Profiles
| Method | Description |
|--------|-------------|
| `profiles.listProfiles()` | List profiles |
| `profiles.createProfile()` | Create profile |
| `profiles.getProfile()` | Get profile |
| `profiles.updateProfile()` | Update profile |
| `profiles.deleteProfile()` | Delete profile |

### Analytics
| Method | Description |
|--------|-------------|
| `analytics.getAnalytics()` | Get post analytics |
| `analytics.getBestTimeToPost()` | Get best times to post |
| `analytics.getContentDecay()` | Get content performance decay |
| `analytics.getDailyMetrics()` | Get daily aggregated metrics |
| `analytics.getFacebookPageInsights()` | Get Facebook Page insights |
| `analytics.getGoogleBusinessPerformance()` | Get GBP performance metrics |
| `analytics.getGoogleBusinessSearchKeywords()` | Get GBP search keywords |
| `analytics.getInstagramAccountInsights()` | Get Instagram insights |
| `analytics.getInstagramDemographics()` | Get Instagram demographics |
| `analytics.getInstagramFollowerHistory()` | Get Instagram follower history |
| `analytics.getLinkedInAggregateAnalytics()` | Get LinkedIn aggregate stats |
| `analytics.getLinkedInOrgAggregateAnalytics()` | Get LinkedIn organization page aggregate analytics |
| `analytics.getLinkedInPostAnalytics()` | Get LinkedIn post stats |
| `analytics.getLinkedInPostReactions()` | Get LinkedIn post reactions |
| `analytics.getPostingFrequency()` | Get frequency vs engagement |
| `analytics.getPostTimeline()` | Get post analytics timeline |
| `analytics.getTikTokAccountInsights()` | Get TikTok account-level insights |
| `analytics.getYouTubeChannelInsights()` | Get YouTube channel-level insights |
| `analytics.getYouTubeDailyViews()` | Get YouTube daily views |
| `analytics.getYouTubeDemographics()` | Get YouTube demographics |

### Account Groups
| Method | Description |
|--------|-------------|
| `accountGroups.listAccountGroups()` | List groups |
| `accountGroups.createAccountGroup()` | Create group |
| `accountGroups.updateAccountGroup()` | Update group |
| `accountGroups.deleteAccountGroup()` | Delete group |

### Queue
| Method | Description |
|--------|-------------|
| `queue.listQueueSlots()` | List schedules |
| `queue.createQueueSlot()` | Create schedule |
| `queue.getNextQueueSlot()` | Get next available slot |
| `queue.updateQueueSlot()` | Update schedule |
| `queue.deleteQueueSlot()` | Delete schedule |
| `queue.previewQueue()` | Preview upcoming slots |

### Webhooks
| Method | Description |
|--------|-------------|
| `webhooks.createWebhookSettings()` | Create webhook |
| `webhooks.getWebhookSettings()` | List webhooks |
| `webhooks.updateWebhookSettings()` | Update webhook |
| `webhooks.deleteWebhookSettings()` | Delete webhook |
| `webhooks.testWebhook()` | Send test webhook |

### API Keys
| Method | Description |
|--------|-------------|
| `apiKeys.listApiKeys()` | List keys |
| `apiKeys.createApiKey()` | Create key |
| `apiKeys.deleteApiKey()` | Delete key |

### Media
| Method | Description |
|--------|-------------|
| `media.getMediaPresignedUrl()` | Get upload URL |

### Users
| Method | Description |
|--------|-------------|
| `users.listUsers()` | List users |
| `users.getUser()` | Get user |

### Usage
| Method | Description |
|--------|-------------|
| `usage.getUsageStats()` | Get plan and usage stats |
| `usage.getXApiPricing()` | Get X/Twitter API pricing table |

### Logs
| Method | Description |
|--------|-------------|
| `logs.listLogs()` | List activity logs |

### Connect (OAuth)
| Method | Description |
|--------|-------------|
| `connect.listFacebookPages()` | List Facebook pages |
| `connect.listGoogleBusinessLocations()` | List GBP locations |
| `connect.listLinkedInOrganizations()` | List LinkedIn orgs |
| `connect.listPinterestBoardsForSelection()` | List Pinterest boards |
| `connect.listSnapchatProfiles()` | List Snapchat profiles |
| `connect.listWhatsAppPhoneNumbers()` | List WhatsApp phone numbers for selection |
| `connect.getConnectUrl()` | Get OAuth connect URL |
| `connect.getFacebookPages()` | List Facebook pages |
| `connect.getGmbLocations()` | List GBP locations |
| `connect.getLinkedInOrganizations()` | List LinkedIn orgs |
| `connect.getPendingOAuthData()` | Get pending OAuth data |
| `connect.getPinterestBoards()` | List Pinterest boards |
| `connect.getRedditFlairs()` | List subreddit flairs |
| `connect.getRedditSubreddits()` | List Reddit subreddits |
| `connect.getTelegramConnectStatus()` | Generate Telegram code |
| `connect.getYoutubePlaylists()` | List YouTube playlists |
| `connect.updateFacebookPage()` | Update Facebook page |
| `connect.updateGmbLocation()` | Update GBP location |
| `connect.updateLinkedInOrganization()` | Switch LinkedIn account type |
| `connect.updatePinterestBoards()` | Set default Pinterest board |
| `connect.updateRedditSubreddits()` | Set default subreddit |
| `connect.updateYoutubeDefaultPlaylist()` | Set default YouTube playlist |
| `connect.completeTelegramConnect()` | Check Telegram status |
| `connect.completeWhatsAppPhoneSelection()` | Complete WhatsApp phone number selection |
| `connect.configureTikTokAdsBrandIdentity()` | Configure TikTok Ads Brand Identity |
| `connect.connectAds()` | Connect ads for a platform |
| `connect.connectBlueskyCredentials()` | Connect Bluesky account |
| `connect.connectWhatsAppCredentials()` | Connect WhatsApp via credentials |
| `connect.handleOAuthCallback()` | Complete OAuth callback |
| `connect.initiateTelegramConnect()` | Connect Telegram directly |
| `connect.selectFacebookPage()` | Select Facebook page |
| `connect.selectGoogleBusinessLocation()` | Select GBP location |
| `connect.selectLinkedInOrganization()` | Select LinkedIn org |
| `connect.selectPinterestBoard()` | Select Pinterest board |
| `connect.selectSnapchatProfile()` | Select Snapchat profile |

### Reddit
| Method | Description |
|--------|-------------|
| `reddit.getRedditFeed()` | Get subreddit feed |
| `reddit.searchReddit()` | Search posts |

### Account Settings
| Method | Description |
|--------|-------------|
| `accountSettings.getInstagramIceBreakers()` | Get IG ice breakers |
| `accountSettings.getMessengerMenu()` | Get FB persistent menu |
| `accountSettings.getTelegramCommands()` | Get TG bot commands |
| `accountSettings.deleteInstagramIceBreakers()` | Delete IG ice breakers |
| `accountSettings.deleteMessengerMenu()` | Delete FB persistent menu |
| `accountSettings.deleteTelegramCommands()` | Delete TG bot commands |
| `accountSettings.setInstagramIceBreakers()` | Set IG ice breakers |
| `accountSettings.setMessengerMenu()` | Set FB persistent menu |
| `accountSettings.setTelegramCommands()` | Set TG bot commands |

### Ad Audiences
| Method | Description |
|--------|-------------|
| `adAudiences.listAdAudiences()` | List custom audiences |
| `adAudiences.createAdAudience()` | Create custom audience |
| `adAudiences.getAdAudience()` | Get audience details |
| `adAudiences.deleteAdAudience()` | Delete custom audience |
| `adAudiences.addUsersToAdAudience()` | Add users to audience |

### Ad Campaigns
| Method | Description |
|--------|-------------|
| `adCampaigns.listAdCampaigns()` | List campaigns |
| `adCampaigns.bulkUpdateAdCampaignStatus()` | Pause or resume many campaigns |
| `adCampaigns.getAdTree()` | Get campaign tree |
| `adCampaigns.updateAdCampaign()` | Update a campaign (budget and/or bid strategy) |
| `adCampaigns.updateAdCampaignStatus()` | Pause or resume a campaign |
| `adCampaigns.updateAdSet()` | Update an ad set (budget, status, and/or bid strategy) |
| `adCampaigns.updateAdSetStatus()` | Pause or resume a single ad set |
| `adCampaigns.deleteAdCampaign()` | Delete a campaign |
| `adCampaigns.duplicateAdCampaign()` | Duplicate a campaign |

### Ads
| Method | Description |
|--------|-------------|
| `ads.listAdAccounts()` | List ad accounts |
| `ads.listAds()` | List ads |
| `ads.listAdsBusinessCenters()` | List TikTok Business Centers |
| `ads.listConversionAssociations()` | List campaigns associated with a conversion destination |
| `ads.listConversionDestinations()` | List destinations for the Conversions API |
| `ads.createConversionDestination()` | Create a conversion destination (LinkedIn) |
| `ads.createCtwaAd()` | Create Click-to-WhatsApp ad |
| `ads.createStandaloneAd()` | Create standalone ad |
| `ads.getAd()` | Get ad details |
| `ads.getAdAnalytics()` | Get ad analytics |
| `ads.getAdComments()` | List comments on an ad |
| `ads.getConversionDestination()` | Fetch a single conversion destination |
| `ads.getConversionMetrics()` | Fetch attribution metrics for a conversion destination |
| `ads.updateAd()` | Update ad |
| `ads.updateConversionDestination()` | Update a conversion destination |
| `ads.deleteAd()` | Cancel an ad |
| `ads.deleteConversionDestination()` | Soft-delete a conversion destination |
| `ads.addConversionAssociations()` | Associate campaigns with a conversion destination |
| `ads.boostPost()` | Boost post as ad |
| `ads.removeConversionAssociations()` | Remove campaign↔conversion associations |
| `ads.searchAdInterests()` | Search targeting interests |
| `ads.searchAdTargetingLocations()` | Search geo targeting locations (Meta) |
| `ads.sendConversions()` | Send conversion events to an ad platform |

### Broadcasts
| Method | Description |
|--------|-------------|
| `broadcasts.listBroadcastRecipients()` | List broadcast recipients |
| `broadcasts.listBroadcasts()` | List broadcasts |
| `broadcasts.createBroadcast()` | Create broadcast draft |
| `broadcasts.getBroadcast()` | Get broadcast details |
| `broadcasts.updateBroadcast()` | Update broadcast |
| `broadcasts.deleteBroadcast()` | Delete broadcast |
| `broadcasts.addBroadcastRecipients()` | Add recipients to a broadcast |
| `broadcasts.cancelBroadcast()` | Cancel broadcast |
| `broadcasts.scheduleBroadcast()` | Schedule broadcast for later |
| `broadcasts.sendBroadcast()` | Send broadcast now |

### Comment Automations
| Method | Description |
|--------|-------------|
| `commentAutomations.listCommentAutomationLogs()` | List automation logs |
| `commentAutomations.listCommentAutomations()` | List comment-to-DM automations |
| `commentAutomations.createCommentAutomation()` | Create comment-to-DM automation |
| `commentAutomations.getCommentAutomation()` | Get automation details |
| `commentAutomations.updateCommentAutomation()` | Update automation settings |
| `commentAutomations.deleteCommentAutomation()` | Delete automation |

### Comments (Inbox)
| Method | Description |
|--------|-------------|
| `comments.listInboxComments()` | List commented posts |
| `comments.getInboxPostComments()` | Get post comments |
| `comments.deleteInboxComment()` | Delete comment |
| `comments.hideInboxComment()` | Hide comment |
| `comments.likeInboxComment()` | Like comment |
| `comments.replyToInboxPost()` | Reply to comment |
| `comments.sendPrivateReplyToComment()` | Send private reply |
| `comments.unhideInboxComment()` | Unhide comment |
| `comments.unlikeInboxComment()` | Unlike comment |

### Contacts
| Method | Description |
|--------|-------------|
| `contacts.listContacts()` | List contacts |
| `contacts.bulkCreateContacts()` | Bulk create contacts |
| `contacts.createContact()` | Create contact |
| `contacts.getContact()` | Get contact |
| `contacts.getContactChannels()` | List channels for a contact |
| `contacts.updateContact()` | Update contact |
| `contacts.deleteContact()` | Delete contact |

### Custom Fields
| Method | Description |
|--------|-------------|
| `customFields.listCustomFields()` | List custom field definitions |
| `customFields.createCustomField()` | Create custom field |
| `customFields.updateCustomField()` | Update custom field |
| `customFields.deleteCustomField()` | Delete custom field |
| `customFields.clearContactFieldValue()` | Clear custom field value |
| `customFields.setContactFieldValue()` | Set custom field value |

### Discord
| Method | Description |
|--------|-------------|
| `discord.getDiscordChannels()` | List Discord guild channels |
| `discord.getDiscordSettings()` | Get Discord account settings |
| `discord.updateDiscordSettings()` | Update Discord settings |

### GMB Attributes
| Method | Description |
|--------|-------------|
| `gmbAttributes.getGoogleBusinessAttributes()` | Get attributes |
| `gmbAttributes.updateGoogleBusinessAttributes()` | Update attributes |

### GMB Food Menus
| Method | Description |
|--------|-------------|
| `gmbFoodMenus.getGoogleBusinessFoodMenus()` | Get food menus |
| `gmbFoodMenus.updateGoogleBusinessFoodMenus()` | Update food menus |

### GMB Location Details
| Method | Description |
|--------|-------------|
| `gmbLocationDetails.getGoogleBusinessLocationDetails()` | Get location details |
| `gmbLocationDetails.updateGoogleBusinessLocationDetails()` | Update location details |

### GMB Media
| Method | Description |
|--------|-------------|
| `gmbMedia.listGoogleBusinessMedia()` | List media |
| `gmbMedia.createGoogleBusinessMedia()` | Upload photo |
| `gmbMedia.deleteGoogleBusinessMedia()` | Delete photo |

### GMB Place Actions
| Method | Description |
|--------|-------------|
| `gmbPlaceActions.listGoogleBusinessPlaceActions()` | List action links |
| `gmbPlaceActions.createGoogleBusinessPlaceAction()` | Create action link |
| `gmbPlaceActions.updateGoogleBusinessPlaceAction()` | Update action link |
| `gmbPlaceActions.deleteGoogleBusinessPlaceAction()` | Delete action link |

### GMB Services
| Method | Description |
|--------|-------------|
| `gmbServices.getGoogleBusinessServices()` | Get services |
| `gmbServices.updateGoogleBusinessServices()` | Replace services |

### Messages (Inbox)
| Method | Description |
|--------|-------------|
| `messages.listInboxConversations()` | List conversations |
| `messages.createInboxConversation()` | Create conversation |
| `messages.getInboxConversation()` | Get conversation |
| `messages.getInboxConversationMessages()` | List messages |
| `messages.updateInboxConversation()` | Update conversation status |
| `messages.deleteInboxMessage()` | Delete message |
| `messages.addMessageReaction()` | Add reaction |
| `messages.editInboxMessage()` | Edit message |
| `messages.removeMessageReaction()` | Remove reaction |
| `messages.sendInboxMessage()` | Send message |
| `messages.sendTypingIndicator()` | Send typing indicator |
| `messages.uploadMediaDirect()` | Upload media file |

### Reviews (Inbox)
| Method | Description |
|--------|-------------|
| `reviews.listInboxReviews()` | List reviews |
| `reviews.deleteInboxReviewReply()` | Delete review reply |
| `reviews.replyToInboxReview()` | Reply to review |

### Sequences
| Method | Description |
|--------|-------------|
| `sequences.listSequenceEnrollments()` | List enrollments for a sequence |
| `sequences.listSequences()` | List sequences |
| `sequences.createSequence()` | Create sequence |
| `sequences.getSequence()` | Get sequence with steps |
| `sequences.updateSequence()` | Update sequence |
| `sequences.deleteSequence()` | Delete sequence |
| `sequences.activateSequence()` | Activate sequence |
| `sequences.enrollContacts()` | Enroll contacts in a sequence |
| `sequences.pauseSequence()` | Pause sequence |
| `sequences.unenrollContact()` | Unenroll contact |

### Tracking Tags
| Method | Description |
|--------|-------------|
| `trackingTags.listTrackingTags()` | List tracking tags (Meta Pixels) |
| `trackingTags.listTrackingTagSharedAccounts()` | List ad accounts a tracking tag is shared with |
| `trackingTags.createTrackingTag()` | Create a tracking tag (Meta Pixel) |
| `trackingTags.getTrackingTag()` | Fetch a single tracking tag (Meta Pixel) |
| `trackingTags.getTrackingTagStats()` | Aggregated event stats for a tracking tag (Meta Pixel) |
| `trackingTags.updateTrackingTag()` | Update a tracking tag (Meta Pixel) |
| `trackingTags.addTrackingTagSharedAccount()` | Share a tracking tag with an ad account |
| `trackingTags.removeTrackingTagSharedAccount()` | Stop sharing a tracking tag with an ad account |

### Twitter Engagement
| Method | Description |
|--------|-------------|
| `twitterEngagement.bookmarkPost()` | Bookmark a tweet |
| `twitterEngagement.followUser()` | Follow a user |
| `twitterEngagement.removeBookmark()` | Remove bookmark |
| `twitterEngagement.retweetPost()` | Retweet a post |
| `twitterEngagement.undoRetweet()` | Undo retweet |
| `twitterEngagement.unfollowUser()` | Unfollow a user |

### Validate
| Method | Description |
|--------|-------------|
| `validate.validateMedia()` | Validate media URL |
| `validate.validatePost()` | Validate post content |
| `validate.validatePostLength()` | Validate character count |
| `validate.validateSubreddit()` | Check subreddit existence |

### WhatsApp
| Method | Description |
|--------|-------------|
| `whatsapp.listWhatsAppGroupChats()` | List active groups |
| `whatsapp.listWhatsAppGroupJoinRequests()` | List join requests |
| `whatsapp.createWhatsAppGroupChat()` | Create group |
| `whatsapp.createWhatsAppGroupInviteLink()` | Create invite link |
| `whatsapp.createWhatsAppTemplate()` | Create template |
| `whatsapp.getWhatsAppBusinessProfile()` | Get business profile |
| `whatsapp.getWhatsAppDisplayName()` | Get display name status |
| `whatsapp.getWhatsAppGroupChat()` | Get group info |
| `whatsapp.getWhatsAppTemplate()` | Get template |
| `whatsapp.getWhatsAppTemplates()` | List templates |
| `whatsapp.updateWhatsAppBusinessProfile()` | Update business profile |
| `whatsapp.updateWhatsAppDisplayName()` | Request display name change |
| `whatsapp.updateWhatsAppGroupChat()` | Update group settings |
| `whatsapp.updateWhatsAppTemplate()` | Update template |
| `whatsapp.deleteWhatsAppGroupChat()` | Delete group |
| `whatsapp.deleteWhatsAppTemplate()` | Delete template |
| `whatsapp.addWhatsAppGroupParticipants()` | Add participants |
| `whatsapp.approveWhatsAppGroupJoinRequests()` | Approve join requests |
| `whatsapp.rejectWhatsAppGroupJoinRequests()` | Reject join requests |
| `whatsapp.removeWhatsAppGroupParticipants()` | Remove participants |
| `whatsapp.sendWhatsAppConversion()` | Send WhatsApp conversion event |
| `whatsapp.uploadWhatsAppProfilePhoto()` | Upload profile picture |

### WhatsApp Flows
| Method | Description |
|--------|-------------|
| `whatsappFlows.listWhatsAppFlows()` | List flows |
| `whatsappFlows.createWhatsAppFlow()` | Create flow |
| `whatsappFlows.getWhatsAppFlow()` | Get flow |
| `whatsappFlows.getWhatsAppFlowJson()` | Get flow JSON asset |
| `whatsappFlows.updateWhatsAppFlow()` | Update flow |
| `whatsappFlows.deleteWhatsAppFlow()` | Delete flow |
| `whatsappFlows.deprecateWhatsAppFlow()` | Deprecate flow |
| `whatsappFlows.publishWhatsAppFlow()` | Publish flow |
| `whatsappFlows.sendWhatsAppFlowMessage()` | Send flow message |
| `whatsappFlows.uploadWhatsAppFlowJson()` | Upload flow JSON |

### WhatsApp Phone Numbers
| Method | Description |
|--------|-------------|
| `whatsappPhoneNumbers.getWhatsAppPhoneNumber()` | Get phone number |
| `whatsappPhoneNumbers.getWhatsAppPhoneNumbers()` | List phone numbers |
| `whatsappPhoneNumbers.purchaseWhatsAppPhoneNumber()` | Purchase phone number |
| `whatsappPhoneNumbers.releaseWhatsAppPhoneNumber()` | Release phone number |

### Invites
| Method | Description |
|--------|-------------|
| `invites.createInviteToken()` | Create invite token |

## Requirements

- Node.js 18+
- [Zernio API key](https://zernio.com) (free tier available)

## Links

- [Documentation](https://docs.zernio.com)
- [Dashboard](https://zernio.com/dashboard)
- [Changelog](https://docs.zernio.com/changelog)

## License

Apache-2.0
