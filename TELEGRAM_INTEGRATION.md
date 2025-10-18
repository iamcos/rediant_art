# Telegram Integration for Rediant Art Blog

This document explains how to set up automatic blog post creation from your Telegram channel using the `#web` hashtag.

## Overview

The integration allows you to:
- Post content to your Telegram channel with `#web` hashtag
- Automatically create blog posts on rediant.art
- Support both English and Russian content
- Include images and media
- Maintain secure authentication

## Setup Instructions

### 1. Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the prompts to create your bot
4. Save the bot token (you'll need this for environment variables)

### 2. Get Channel Information

1. Add your bot to your Telegram channel as an administrator
2. Get your channel ID by forwarding a message from your channel to `@userinfobot`
3. Save the channel ID

### 3. Configure Environment Variables

Add these to your Vercel project settings:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHANNEL_ID=your_channel_id_here

# Security (optional but recommended)
TELEGRAM_WEBHOOK_SECRET=your_webhook_secret_here
```

### 4. Deploy to Vercel

The integration is already set up in your project. Just deploy:

```bash
vercel --prod
```

### 5. Set Webhook (Optional)

For production, you can set up a webhook instead of polling:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://rediant-art2.vercel.app/api/telegram-webhook"}'
```

## Usage

### Creating Blog Posts

1. **Post to your Telegram channel** with the `#web` hashtag
2. **Include images** if desired (they'll be automatically downloaded)
3. **Use additional hashtags** for categorization:
   - `#featured` - Makes the post featured
   - `#en` or `#ru` - Forces language (auto-detected otherwise)
   - Any other tags for categorization

### Example Telegram Post

```
New jewelry collection is here! ✨

These facechains combine ancient tribal inspiration with modern 3D printing technology. Each piece tells a story of transformation and beauty.

#web #featured #jewelry #3dprinting #innovation
```

### Supported Content Types

- ✅ Text posts
- ✅ Posts with images
- ✅ Posts with captions
- ✅ Multi-language support (auto-detection)
- ✅ Hashtag categorization
- ✅ Featured post marking

## Security Features

- **Channel verification** - Only processes messages from your specific channel
- **Hashtag filtering** - Only processes posts with `#web` hashtag
- **Input validation** - All content is validated before processing
- **Error handling** - Graceful error handling with logging

## File Structure

```
src/
├── pages/api/
│   └── telegram-webhook.ts    # Webhook endpoint
├── utils/
│   └── telegram-integration.ts # Utility functions
└── content/articles/          # Generated blog posts
    └── telegram-*.md          # Auto-generated posts
```

## Generated Blog Posts

Posts are automatically created as markdown files in `src/content/articles/` with the following structure:

```markdown
---
title: "Your Post Title"
description: "Auto-generated description"
author: "Svetlana (Mizyre)"
date: "2024-01-15"
featured: true
image: "/images/telegram-123456.jpg"
tags: ["jewelry", "3dprinting", "innovation"]
lang: "en"
source: "telegram"
messageId: 123456
channelId: -1001234567890
---

# Your Post Title

Your post content here...

---

*This post was automatically imported from Telegram. Original message ID: 123456*
```

## Troubleshooting

### Bot Not Responding
- Check that the bot token is correct
- Verify the bot is added to your channel as admin
- Check Vercel function logs

### Posts Not Appearing
- Ensure posts contain `#web` hashtag
- Check that images are accessible
- Verify content collection is working

### Language Detection Issues
- Use `#en` or `#ru` hashtags to force language
- Check for Cyrillic characters in Russian posts

## Advanced Configuration

### Custom Processing
You can modify `src/utils/telegram-integration.ts` to:
- Add custom content processing
- Implement different image handling
- Add custom validation rules

### Multiple Channels
To support multiple channels, modify the channel ID check in the webhook handler.

## Support

For issues or questions:
- Check Vercel function logs
- Review Telegram Bot API documentation
- Contact the development team

## Security Notes

- Never commit bot tokens to version control
- Use environment variables for all sensitive data
- Regularly rotate bot tokens
- Monitor webhook endpoints for abuse









