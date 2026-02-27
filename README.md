<p align="center">
  <a href="https://getlate.dev">
    <img src="https://getlate.dev/images/icon_light.svg" alt="Late" width="60">
  </a>
</p>

<h1 align="center">Late Node.js SDK</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@getlatedev/node"><img src="https://img.shields.io/npm/v/@getlatedev/node.svg" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="License"></a>
</p>

<p align="center">
  <strong>One API to post everywhere. 13 platforms, zero headaches.</strong>
</p>

The official Node.js SDK for the [Late API](https://getlate.dev) — schedule and publish social media posts across Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, Bluesky, Reddit, Snapchat, Telegram, and Google Business Profile with a single integration.

## Installation

```bash
npm install @getlatedev/node
```

## Quick Start

```typescript
import Late from '@getlatedev/node';

const late = new Late(); // Uses LATE_API_KEY env var

// Publish to multiple platforms with one call
const { data: post } = await late.posts.createPost({
  body: {
    content: 'Hello world from Late!',
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
const late = new Late({
  apiKey: 'your-api-key', // Defaults to process.env['LATE_API_KEY']
  baseURL: 'https://getlate.dev/api',
  timeout: 60000,
});
```

## Examples

### Schedule a Post

```typescript
const { data: post } = await late.posts.createPost({
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
const { data: post } = await late.posts.createPost({
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
const { data: presign } = await late.media.getMediaPresignedUrl({
  body: { filename: 'video.mp4', contentType: 'video/mp4' },
});

// 2. Upload your file
await fetch(presign.uploadUrl, {
  method: 'PUT',
  body: videoBuffer,
  headers: { 'Content-Type': 'video/mp4' },
});

// 3. Create post with media
const { data: post } = await late.posts.createPost({
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
const { data } = await late.analytics.getAnalytics({
  query: { postId: 'post_xxx' },
});

console.log('Views:', data.analytics.views);
console.log('Likes:', data.analytics.likes);
console.log('Engagement Rate:', data.analytics.engagementRate);
```

### List Connected Accounts

```typescript
const { data } = await late.accounts.listAccounts();

for (const account of data.accounts) {
  console.log(`${account.platform}: @${account.username}`);
}
```

## Error Handling

```typescript
import Late, { LateApiError, RateLimitError, ValidationError } from '@getlatedev/node';

try {
  await late.posts.createPost({ body: { /* ... */ } });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry in ${error.getSecondsUntilReset()}s`);
  } else if (error instanceof ValidationError) {
    console.log('Invalid request:', error.fields);
  } else if (error instanceof LateApiError) {
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
| `posts.deletePost()` | Delete post |
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
| `accounts.updateAccount()` | Update account |
| `accounts.deleteAccount()` | Disconnect account |

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
| `analytics.getLinkedInAggregateAnalytics()` | Get LinkedIn aggregate stats |
| `analytics.getLinkedInPostAnalytics()` | Get LinkedIn post stats |
| `analytics.getPostingFrequency()` | Get posting frequency vs engagement |
| `analytics.getYouTubeDailyViews()` | Get YouTube daily views |

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
| `webhooks.getWebhookLogs()` | Get delivery logs |
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
| `media.getMediaPresignedUrl()` | Get presigned upload URL |

### Tools
| Method | Description |
|--------|-------------|
| `tools.getYouTubeTranscript()` | Get YouTube transcript |
| `tools.checkInstagramHashtags()` | Check IG hashtag bans |
| `tools.downloadBlueskyMedia()` | Download Bluesky media |
| `tools.downloadFacebookVideo()` | Download Facebook video |
| `tools.downloadInstagramMedia()` | Download Instagram media |
| `tools.downloadLinkedInVideo()` | Download LinkedIn video |
| `tools.downloadTikTokVideo()` | Download TikTok video |
| `tools.downloadTwitterMedia()` | Download Twitter/X media |
| `tools.downloadYouTubeVideo()` | Download YouTube video |

### Users
| Method | Description |
|--------|-------------|
| `users.listUsers()` | List users |
| `users.getUser()` | Get user |

### Usage
| Method | Description |
|--------|-------------|
| `usage.getUsageStats()` | Get plan and usage stats |

### Logs
| Method | Description |
|--------|-------------|
| `logs.listConnectionLogs()` | List connection logs |
| `logs.listPostsLogs()` | List publishing logs |
| `logs.getPostLogs()` | Get post logs |

### Connect (OAuth)
| Method | Description |
|--------|-------------|
| `connect.listFacebookPages()` | List Facebook pages |
| `connect.listGoogleBusinessLocations()` | List GBP locations |
| `connect.listLinkedInOrganizations()` | List LinkedIn orgs |
| `connect.listPinterestBoardsForSelection()` | List Pinterest boards |
| `connect.listSnapchatProfiles()` | List Snapchat profiles |
| `connect.getConnectUrl()` | Get OAuth connect URL |
| `connect.getFacebookPages()` | List Facebook pages |
| `connect.getGmbLocations()` | List GBP locations |
| `connect.getLinkedInOrganizations()` | List LinkedIn orgs |
| `connect.getPendingOAuthData()` | Get pending OAuth data |
| `connect.getPinterestBoards()` | List Pinterest boards |
| `connect.getRedditFlairs()` | List subreddit flairs |
| `connect.getRedditSubreddits()` | List Reddit subreddits |
| `connect.getTelegramConnectStatus()` | Generate Telegram code |
| `connect.updateFacebookPage()` | Update Facebook page |
| `connect.updateGmbLocation()` | Update GBP location |
| `connect.updateLinkedInOrganization()` | Switch LinkedIn account type |
| `connect.updatePinterestBoards()` | Set default Pinterest board |
| `connect.updateRedditSubreddits()` | Set default subreddit |
| `connect.completeTelegramConnect()` | Check Telegram status |
| `connect.connectBlueskyCredentials()` | Connect Bluesky account |
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
| `gmbPlaceActions.deleteGoogleBusinessPlaceAction()` | Delete action link |

### Messages (Inbox)
| Method | Description |
|--------|-------------|
| `messages.listInboxConversations()` | List conversations |
| `messages.getInboxConversation()` | Get conversation |
| `messages.getInboxConversationMessages()` | List messages |
| `messages.updateInboxConversation()` | Update conversation status |
| `messages.editInboxMessage()` | Edit message |
| `messages.sendInboxMessage()` | Send message |

### Reviews (Inbox)
| Method | Description |
|--------|-------------|
| `reviews.listInboxReviews()` | List reviews |
| `reviews.deleteInboxReviewReply()` | Delete review reply |
| `reviews.replyToInboxReview()` | Reply to review |

### Validate
| Method | Description |
|--------|-------------|
| `validate.validateMedia()` | Validate media URL |
| `validate.validatePost()` | Validate post content |
| `validate.validatePostLength()` | Validate post character count |
| `validate.validateSubreddit()` | Check subreddit existence |

### Invites
| Method | Description |
|--------|-------------|
| `invites.createInviteToken()` | Create invite token |

## Requirements

- Node.js 18+
- [Late API key](https://getlate.dev) (free tier available)

## Links

- [Documentation](https://docs.getlate.dev)
- [Dashboard](https://getlate.dev/dashboard)
- [Changelog](https://docs.getlate.dev/changelog)

## License

Apache-2.0
