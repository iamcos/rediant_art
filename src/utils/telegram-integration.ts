/**
 * Telegram Integration Utilities
 * 
 * This module provides utilities for integrating Telegram posts with the Rediant Art blog.
 * It handles content processing, image downloading, and blog post creation.
 */

import fs from 'fs/promises';
import path from 'path';

export interface TelegramPost {
  messageId: number;
  text: string;
  caption?: string;
  photos?: Array<{
    file_id: string;
    width: number;
    height: number;
  }>;
  video?: {
    file_id: string;
    width: number;
    height: number;
    duration: number;
  };
  document?: {
    file_id: string;
    file_name: string;
    mime_type: string;
  };
  date: number;
  author: string;
  channelId: number;
}

export interface BlogPostPart {
  partNumber: number;
  messageId: number;
  content: string;
  images: string[];
  videos: string[];
  products: string[]; // Tribute product IDs
  date: number;
  type: 'text' | 'images' | 'video' | 'product' | 'mixed';
}

export interface MultiPartBlogPost {
  blogId: string;
  title: string;
  description: string;
  author: string;
  date: string;
  featured: boolean;
  tags: string[];
  lang: 'en' | 'ru';
  parts: BlogPostPart[];
  status: 'draft' | 'complete' | 'publishing';
  totalParts?: number;
}

export interface ProcessedArticle {
  title: string;
  description: string;
  author: string;
  date: string;
  featured: boolean;
  image?: string;
  tags: string[];
  lang: 'en' | 'ru';
  source: 'telegram';
  messageId: number;
  channelId: number;
  content: string;
}

/**
 * Process a Telegram post and extract relevant information
 */
export function processTelegramPost(post: TelegramPost): ProcessedArticle {
  const text = post.text || post.caption || '';
  const hashtags = text.match(/#\w+/g) || [];
  
  // Determine language
  const isRussian = /[а-яё]/i.test(text);
  const lang = isRussian ? 'ru' : 'en';
  
  // Clean text (remove hashtags for content)
  const cleanText = text.replace(/#\w+/g, '').trim();
  
  // Extract title (first line or first 100 characters)
  const title = cleanText.split('\n')[0] || 'New Post from Telegram';
  
  // Create description (truncated version)
  const description = cleanText.length > 200 
    ? cleanText.substring(0, 200) + '...' 
    : cleanText;
  
  // Process tags (remove # symbol)
  const tags = hashtags.map(tag => tag.substring(1));
  
  return {
    title: title.length > 100 ? title.substring(0, 100) + '...' : title,
    description,
    author: 'Svetlana (Mizyre)',
    date: new Date(post.date * 1000).toISOString().split('T')[0],
    featured: hashtags.includes('#featured'),
    tags,
    lang,
    source: 'telegram',
    messageId: post.messageId,
    channelId: post.channelId,
    content: cleanText,
  };
}

/**
 * Check if post is part of a multi-part blog post
 */
export function isMultiPartBlogPost(text: string): boolean {
  return text.includes('#blog');
}

/**
 * Extract blog post information from hashtags
 */
export function extractBlogPostInfo(text: string): {
  blogId: string;
  partNumber: number;
  isFeatured: boolean;
  totalParts?: number;
} {
  const hashtags = text.match(/#\w+/g) || [];
  
  // Extract blog ID (e.g., #blog_my_collection or just #blog)
  const blogTag = hashtags.find(tag => tag.startsWith('#blog'));
  const blogId = blogTag ? blogTag.substring(1) : 'blog';
  
  // Extract part number (e.g., #featured_1, #part_2, etc.)
  const partTag = hashtags.find(tag => 
    tag.includes('_') && (tag.includes('featured') || tag.includes('part'))
  );
  const partNumber = partTag ? parseInt(partTag.split('_')[1]) || 1 : 1;
  
  // Check if featured
  const isFeatured = hashtags.includes('#featured') || hashtags.includes('#featured_1');
  
  // Extract total parts if specified (e.g., #total_5)
  const totalTag = hashtags.find(tag => tag.startsWith('#total_'));
  const totalParts = totalTag ? parseInt(totalTag.split('_')[1]) : undefined;
  
  return {
    blogId,
    partNumber,
    isFeatured,
    totalParts,
  };
}

/**
 * Process a multi-part blog post part
 */
export async function processBlogPostPart(
  post: TelegramPost,
  blogInfo: ReturnType<typeof extractBlogPostInfo>
): Promise<BlogPostPart> {
  const text = post.text || post.caption || '';
  const cleanText = text.replace(/#\w+/g, '').trim();
  
  // Download images
  const images: string[] = [];
  if (post.photos && post.photos.length > 0) {
    for (const photo of post.photos) {
      const imagePath = await downloadTelegramImage(photo.file_id, post.messageId);
      if (imagePath) images.push(imagePath);
    }
  }
  
  // Download videos
  const videos: string[] = [];
  if (post.video) {
    const videoPath = await downloadTelegramVideo(post.video.file_id, post.messageId);
    if (videoPath) videos.push(videoPath);
  }
  
  // Extract Tribute product IDs from text
  const products: string[] = [];
  const productMatches = text.match(/tribute\.tg\/[a-zA-Z0-9_-]+/g) || [];
  products.push(...productMatches);
  
  // Determine content type
  let type: BlogPostPart['type'] = 'text';
  if (images.length > 0 && cleanText.length > 0) type = 'mixed';
  else if (images.length > 0) type = 'images';
  else if (videos.length > 0) type = 'video';
  else if (products.length > 0) type = 'product';
  
  return {
    partNumber: blogInfo.partNumber,
    messageId: post.messageId,
    content: cleanText,
    images,
    videos,
    products,
    date: post.date,
    type,
  };
}

/**
 * Download video from Telegram
 */
export async function downloadTelegramVideo(
  fileId: string, 
  messageId: number
): Promise<string | null> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new Error('Telegram bot token not configured');
    }

    // Get file path from Telegram
    const fileResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
    );
    const fileData = await fileResponse.json();
    
    if (!fileData.ok) {
      throw new Error('Failed to get file info from Telegram');
    }

    // Download the file
    const videoResponse = await fetch(
      `https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`
    );
    
    if (!videoResponse.ok) {
      throw new Error('Failed to download video from Telegram');
    }

    // Save to public/videos directory
    const videoBuffer = await videoResponse.arrayBuffer();
    const filename = `telegram-video-${messageId}-${Date.now()}.mp4`;
    const videoPath = path.join(process.cwd(), 'public', 'videos', filename);
    
    // Ensure videos directory exists
    await fs.mkdir(path.dirname(videoPath), { recursive: true });
    await fs.writeFile(videoPath, Buffer.from(videoBuffer));
    
    return `/videos/${filename}`;
  } catch (error) {
    console.error('Error downloading Telegram video:', error);
    return null;
  }
}

/**
 * Download image from Telegram and save to public directory
 */
export async function downloadTelegramImage(
  fileId: string, 
  messageId: number
): Promise<string | null> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new Error('Telegram bot token not configured');
    }

    // Get file path from Telegram
    const fileResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
    );
    const fileData = await fileResponse.json();
    
    if (!fileData.ok) {
      throw new Error('Failed to get file info from Telegram');
    }

    // Download the file
    const imageResponse = await fetch(
      `https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`
    );
    
    if (!imageResponse.ok) {
      throw new Error('Failed to download image from Telegram');
    }

    // Save to public/images directory
    const imageBuffer = await imageResponse.arrayBuffer();
    const filename = `telegram-${messageId}-${Date.now()}.jpg`;
    const imagePath = path.join(process.cwd(), 'public', 'images', filename);
    
    await fs.writeFile(imagePath, Buffer.from(imageBuffer));
    
    return `/images/${filename}`;
  } catch (error) {
    console.error('Error downloading Telegram image:', error);
    return null;
  }
}

/**
 * Create a markdown file for the blog post
 */
export async function createBlogPost(article: ProcessedArticle): Promise<string> {
  const filename = `telegram-${article.messageId}-${article.date}.md`;
  const filePath = path.join(process.cwd(), 'src', 'content', 'articles', filename);
  
  const frontmatter = `---
title: "${article.title.replace(/"/g, '\\"')}"
description: "${article.description.replace(/"/g, '\\"')}"
author: "${article.author}"
date: "${article.date}"
featured: ${article.featured}
${article.image ? `image: "${article.image}"` : ''}
tags: [${article.tags.map(tag => `"${tag}"`).join(', ')}]
lang: "${article.lang}"
source: "telegram"
messageId: ${article.messageId}
channelId: ${article.channelId}
---

# ${article.title}

${article.content}

---

*This post was automatically imported from Telegram. Original message ID: ${article.messageId}*`;

  await fs.writeFile(filePath, frontmatter, 'utf-8');
  
  return filename;
}

/**
 * Validate Telegram webhook payload
 */
export function validateTelegramWebhook(payload: any): boolean {
  try {
    // Basic validation - in production, you should verify the signature
    return payload && 
           payload.message && 
           typeof payload.message.message_id === 'number' &&
           typeof payload.message.date === 'number';
  } catch {
    return false;
  }
}

/**
 * Extract hashtags from text
 */
export function extractHashtags(text: string): string[] {
  const hashtags = text.match(/#\w+/g) || [];
  return hashtags.map(tag => tag.substring(1)); // Remove # symbol
}

/**
 * Check if post should be processed (contains #web hashtag)
 */
export function shouldProcessPost(text: string): boolean {
  return text.includes('#web');
}
