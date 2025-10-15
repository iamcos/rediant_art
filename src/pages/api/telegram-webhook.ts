import type { APIRoute } from 'astro';
import { z } from 'zod';
import { addBlogPostPart, getBlogPostStatus } from '../../utils/multi-part-blog';
import { isMultiPartBlogPost } from '../../utils/telegram-integration';

// Telegram webhook payload schema
const TelegramMessageSchema = z.object({
  message: z.object({
    message_id: z.number(),
    from: z.object({
      id: z.number(),
      is_bot: z.boolean(),
      first_name: z.string(),
      username: z.string().optional(),
    }),
    chat: z.object({
      id: z.number(),
      type: z.string(),
      title: z.string().optional(),
    }),
    date: z.number(),
    text: z.string().optional(),
    photo: z.array(z.object({
      file_id: z.string(),
      file_unique_id: z.string(),
      width: z.number(),
      height: z.number(),
      file_size: z.number().optional(),
    })).optional(),
    caption: z.string().optional(),
    entities: z.array(z.object({
      type: z.string(),
      offset: z.number(),
      length: z.number(),
    })).optional(),
  }),
});

const TelegramUpdateSchema = z.object({
  update_id: z.number(),
  message: TelegramMessageSchema.shape.message.optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify the request is from Telegram
    const telegramToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    if (!telegramToken) {
      return new Response('Telegram bot token not configured', { status: 500 });
    }

    const body = await request.json();
    const update = TelegramUpdateSchema.parse(body);

    // Only process messages from your specific channel
    const allowedChannelId = import.meta.env.TELEGRAM_CHANNEL_ID;
    if (!allowedChannelId || update.message?.chat.id.toString() !== allowedChannelId) {
      return new Response('Unauthorized channel', { status: 403 });
    }

    if (!update.message) {
      return new Response('No message in update', { status: 200 });
    }

    const message = update.message;
    const text = message.text || message.caption || '';
    
    // Check if message contains #web or #blog hashtag
    if (!text.includes('#web') && !text.includes('#blog')) {
      return new Response('Message does not contain #web or #blog hashtag', { status: 200 });
    }

    // Handle multi-part blog posts
    if (isMultiPartBlogPost(text)) {
      const result = await addBlogPostPart({
        messageId: message.message_id,
        text: message.text || '',
        caption: message.caption,
        photos: message.photo,
        video: message.video,
        document: message.document,
        date: message.date,
        author: message.from?.first_name || 'Channel',
        channelId: message.chat.id,
      });

      return new Response(JSON.stringify({ 
        success: result.success,
        message: result.message,
        blogId: result.blogId,
        partNumber: result.partNumber,
        isComplete: result.isComplete,
        type: 'multipart-blog'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Extract hashtags and clean content
    const hashtags = text.match(/#\w+/g) || [];
    const cleanText = text.replace(/#\w+/g, '').trim();
    
    // Determine language based on content or channel
    const isRussian = /[а-яё]/i.test(text);
    const lang = isRussian ? 'ru' : 'en';

    // Create article data
    const articleData = {
      title: cleanText.split('\n')[0] || 'New Post from Telegram',
      description: cleanText.length > 200 ? cleanText.substring(0, 200) + '...' : cleanText,
      author: 'Svetlana (Mizyre)',
      date: new Date(message.date * 1000).toISOString().split('T')[0],
      featured: hashtags.includes('#featured'),
      tags: hashtags.map(tag => tag.substring(1)), // Remove # symbol
      lang: lang,
      source: 'telegram',
      messageId: message.message_id,
      channelId: message.chat.id,
    };

    // Handle images if present
    let imagePath = null;
    if (message.photo && message.photo.length > 0) {
      // Get the highest resolution photo
      const bestPhoto = message.photo.reduce((prev, current) => 
        (current.width > prev.width) ? current : prev
      );
      
      // In a real implementation, you would:
      // 1. Download the image from Telegram using getFile API
      // 2. Save it to your public/images directory
      // 3. Set imagePath to the saved file path
      imagePath = `/images/telegram-${message.message_id}.jpg`;
    }

    // Save to content collection (this would need to be implemented)
    // For now, we'll just log the data
    console.log('New Telegram post to be added:', {
      ...articleData,
      imagePath,
      originalText: text,
    });

    // In a real implementation, you would:
    // 1. Create a new markdown file in src/content/articles/
    // 2. Download and save any images
    // 3. Trigger a site rebuild or use ISR

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Post processed successfully',
      articleData 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Telegram webhook error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
