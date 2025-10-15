/**
 * Telegram Bot for Rediant Art Blog Integration
 * 
 * This script sets up a Telegram bot that monitors your channel for posts with #web hashtag
 * and automatically creates blog posts on your website.
 * 
 * Setup Instructions:
 * 1. Create a bot with @BotFather on Telegram
 * 2. Get your bot token and channel ID
 * 3. Set environment variables in Vercel
 * 4. Deploy this as a Vercel serverless function
 */

const { Telegraf } = require('telegraf');

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Your channel ID (get this from your Telegram channel)
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const WEBHOOK_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/telegram-webhook`
  : process.env.WEBHOOK_URL;

// Monitor channel for messages with #web hashtag
bot.on('channel_post', async (ctx) => {
  const message = ctx.channelPost;
  const text = message.text || message.caption || '';
  
  // Check if message contains #web hashtag
  if (!text.includes('#web')) {
    return;
  }

  console.log('Processing message with #web hashtag:', message.message_id);
  
  try {
    // Send to your webhook endpoint
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        update_id: Date.now(),
        message: {
          message_id: message.message_id,
          from: {
            id: message.from?.id || 0,
            is_bot: message.from?.is_bot || false,
            first_name: message.from?.first_name || 'Channel',
            username: message.from?.username,
          },
          chat: {
            id: message.chat.id,
            type: message.chat.type,
            title: message.chat.title,
          },
          date: message.date,
          text: message.text,
          caption: message.caption,
          photo: message.photo,
          entities: message.entities,
        },
      }),
    });

    if (response.ok) {
      console.log('Successfully processed message:', message.message_id);
    } else {
      console.error('Failed to process message:', response.status);
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
});

// Webhook setup for Vercel
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// For local development
if (process.env.NODE_ENV === 'development') {
  bot.launch();
  console.log('Bot started in development mode');
}
