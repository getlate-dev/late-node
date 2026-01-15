<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://getlate.dev/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://getlate.dev/logo-light.svg">
  <img alt="Late" src="https://getlate.dev/logo-light.svg" width="120">
</picture>

# Late Node.js SDK

[![npm version](https://img.shields.io/npm/v/@getlatedev/node.svg)](https://www.npmjs.com/package/@getlatedev/node)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

**One API to post everywhere. 13 platforms, zero headaches.**

The official Node.js SDK for the [Late API](https://getlate.dev) — schedule and publish social media posts across Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, Bluesky, Reddit, Snapchat, Telegram, and Google Business Profile with a single integration.

## Why Late?

- **Single Integration** — Connect once, post to 13 platforms
- **Zero Maintenance** — We handle OAuth, rate limits, media processing, and API changes
- **Production Ready** — 99.97% uptime SLA, used by thousands of apps

## Installation

```bash
npm install @getlatedev/node
```

## Quick Start

```typescript
import Late from '@getlatedev/node';

const late = new Late(); // Uses LATE_API_KEY env var

// Publish to multiple platforms with one call
const { data: post } = await late.posts.create({
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
  apiKey: 'sk_...', // Defaults to process.env['LATE_API_KEY']
  baseURL: 'https://getlate.dev/api',
  timeout: 60000,
});
```

## Examples

### Schedule a Post

```typescript
const { data: post } = await late.posts.create({
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
const { data: post } = await late.posts.create({
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
        platformSpecificContent: 'Professional tone for LinkedIn with more detail about our announcement.',
      },
    ],
    publishNow: true,
  },
});
```

### Upload Media

```typescript
// 1. Get presigned upload URL
const { data: presign } = await late.media.getPresignedUrl({
  body: { filename: 'video.mp4', contentType: 'video/mp4' },
});

// 2. Upload your file
await fetch(presign.uploadUrl, {
  method: 'PUT',
  body: videoBuffer,
  headers: { 'Content-Type': 'video/mp4' },
});

// 3. Create post with media
const { data: post } = await late.posts.create({
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
const { data } = await late.analytics.get({
  query: { postId: 'post_xxx' },
});

console.log('Views:', data.analytics.views);
console.log('Likes:', data.analytics.likes);
console.log('Engagement Rate:', data.analytics.engagementRate);
```

### List Connected Accounts

```typescript
const { data } = await late.accounts.list();

for (const account of data.accounts) {
  console.log(`${account.platform}: @${account.username}`);
}
```

## Error Handling

```typescript
import Late, { LateApiError, RateLimitError, ValidationError } from '@getlatedev/node';

try {
  await late.posts.create({ body: { /* ... */ } });
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

## Available Methods

### Posts
- `posts.list()` — List all posts
- `posts.create()` — Create and schedule a post
- `posts.get()` — Get a specific post
- `posts.update()` — Update a scheduled post
- `posts.delete()` — Delete a post
- `posts.retry()` — Retry a failed post

### Accounts
- `accounts.list()` — List connected social accounts
- `accounts.getFollowerStats()` — Get follower growth data
- `accounts.getAllHealth()` — Check connection status

### Analytics
- `analytics.get()` — Get post performance metrics
- `analytics.getYouTubeDailyViews()` — YouTube-specific analytics

### Media
- `media.getPresignedUrl()` — Get upload URL for media files

### Webhooks
- `webhooks.getSettings()` — Get webhook configuration
- `webhooks.updateSettings()` — Configure webhooks
- `webhooks.test()` — Send a test webhook

See the [full API documentation](https://getlate.dev/docs/api) for all available methods.

## Supported Platforms

| Platform | Post Types |
|----------|-----------|
| Instagram | Reels, Carousels, Stories, Feed Posts |
| TikTok | Videos, Photos, Carousels |
| YouTube | Videos, Shorts |
| LinkedIn | Posts, Articles, Documents |
| X (Twitter) | Tweets, Threads |
| Facebook | Posts, Reels, Stories |
| Threads | Posts |
| Pinterest | Pins |
| Bluesky | Posts |
| Reddit | Posts |
| Snapchat | Stories |
| Telegram | Channel Posts |
| Google Business | Posts |

## Requirements

- Node.js 18+
- [Late API key](https://getlate.dev) (free tier available)

## Links

- [Documentation](https://getlate.dev/docs)
- [API Reference](https://getlate.dev/docs/api)
- [Dashboard](https://getlate.dev/dashboard)
- [Status](https://status.getlate.dev)

## License

Apache-2.0
