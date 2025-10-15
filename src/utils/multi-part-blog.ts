/**
 * Multi-Part Blog Post Management
 * 
 * This module handles the creation and management of multi-part blog posts
 * from Telegram messages with #blog hashtags.
 */

import fs from 'fs/promises';
import path from 'path';
import { 
  MultiPartBlogPost, 
  BlogPostPart, 
  TelegramPost,
  isMultiPartBlogPost,
  extractBlogPostInfo,
  processBlogPostPart
} from './telegram-integration';

// In-memory storage for draft blog posts (in production, use a database)
const draftBlogPosts = new Map<string, MultiPartBlogPost>();

/**
 * Add a new part to a multi-part blog post
 */
export async function addBlogPostPart(post: TelegramPost): Promise<{
  success: boolean;
  blogId: string;
  partNumber: number;
  isComplete: boolean;
  message: string;
}> {
  try {
    const text = post.text || post.caption || '';
    
    if (!isMultiPartBlogPost(text)) {
      return {
        success: false,
        blogId: '',
        partNumber: 0,
        isComplete: false,
        message: 'Not a multi-part blog post'
      };
    }

    const blogInfo = extractBlogPostInfo(text);
    const blogPart = await processBlogPostPart(post, blogInfo);
    
    // Get or create the blog post
    let blogPost = draftBlogPosts.get(blogInfo.blogId);
    
    if (!blogPost) {
      // Create new blog post
      const isRussian = /[а-яё]/i.test(text);
      const lang = isRussian ? 'ru' : 'en';
      
      blogPost = {
        blogId: blogInfo.blogId,
        title: text.split('\n')[0] || 'New Blog Post',
        description: text.length > 200 ? text.substring(0, 200) + '...' : text,
        author: 'Svetlana (Mizyre)',
        date: new Date(post.date * 1000).toISOString().split('T')[0],
        featured: blogInfo.isFeatured,
        tags: text.match(/#\w+/g)?.map(tag => tag.substring(1)) || [],
        lang,
        parts: [],
        status: 'draft',
        totalParts: blogInfo.totalParts,
      };
    }
    
    // Add the part
    blogPost.parts.push(blogPart);
    blogPost.parts.sort((a, b) => a.partNumber - b.partNumber);
    
    // Update status
    const isComplete = blogInfo.totalParts 
      ? blogPost.parts.length >= blogInfo.totalParts
      : blogPost.parts.length >= 3; // Default minimum of 3 parts
    
    if (isComplete) {
      blogPost.status = 'complete';
      await publishMultiPartBlogPost(blogPost);
    }
    
    // Save the updated blog post
    draftBlogPosts.set(blogInfo.blogId, blogPost);
    
    return {
      success: true,
      blogId: blogInfo.blogId,
      partNumber: blogPart.partNumber,
      isComplete,
      message: isComplete 
        ? `Blog post "${blogPost.title}" is complete and published!`
        : `Added part ${blogPart.partNumber} to blog post "${blogPost.title}"`
    };
    
  } catch (error) {
    console.error('Error adding blog post part:', error);
    return {
      success: false,
      blogId: '',
      partNumber: 0,
      isComplete: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Publish a complete multi-part blog post
 */
async function publishMultiPartBlogPost(blogPost: MultiPartBlogPost): Promise<void> {
  try {
    // Generate the combined content
    const combinedContent = generateCombinedContent(blogPost);
    
    // Create the markdown file
    const filename = `${blogPost.blogId}-${blogPost.date}.md`;
    const filePath = path.join(process.cwd(), 'src', 'content', 'articles', filename);
    
    const frontmatter = `---
title: "${blogPost.title.replace(/"/g, '\\"')}"
description: "${blogPost.description.replace(/"/g, '\\"')}"
author: "${blogPost.author}"
date: "${blogPost.date}"
featured: ${blogPost.featured}
tags: [${blogPost.tags.map(tag => `"${tag}"`).join(', ')}]
lang: "${blogPost.lang}"
source: "telegram-multipart"
blogId: "${blogPost.blogId}"
totalParts: ${blogPost.parts.length}
---

# ${blogPost.title}

${combinedContent}

---

*This multi-part blog post was automatically created from ${blogPost.parts.length} Telegram messages.*`;

    await fs.writeFile(filePath, frontmatter, 'utf-8');
    
    // Remove from drafts
    draftBlogPosts.delete(blogPost.blogId);
    
    console.log(`Published multi-part blog post: ${filename}`);
    
  } catch (error) {
    console.error('Error publishing multi-part blog post:', error);
    throw error;
  }
}

/**
 * Generate combined content from all parts
 */
function generateCombinedContent(blogPost: MultiPartBlogPost): string {
  let content = '';
  
  for (const part of blogPost.parts) {
    content += `\n## Part ${part.partNumber}\n\n`;
    
    // Add text content
    if (part.content) {
      content += `${part.content}\n\n`;
    }
    
    // Add images
    if (part.images.length > 0) {
      content += '### Images\n\n';
      for (const image of part.images) {
        content += `![Image](${image})\n\n`;
      }
    }
    
    // Add videos
    if (part.videos.length > 0) {
      content += '### Videos\n\n';
      for (const video of part.videos) {
        content += `<video controls>\n  <source src="${video}" type="video/mp4">\n</video>\n\n`;
      }
    }
    
    // Add Tribute products
    if (part.products.length > 0) {
      content += '### Featured Products\n\n';
      for (const product of part.products) {
        content += `- [View Product](${product})\n`;
      }
      content += '\n';
    }
    
    content += '---\n\n';
  }
  
  return content.trim();
}

/**
 * Get status of a blog post
 */
export function getBlogPostStatus(blogId: string): {
  exists: boolean;
  status: string;
  parts: number;
  totalParts?: number;
  title: string;
} {
  const blogPost = draftBlogPosts.get(blogId);
  
  if (!blogPost) {
    return {
      exists: false,
      status: 'not_found',
      parts: 0,
      title: ''
    };
  }
  
  return {
    exists: true,
    status: blogPost.status,
    parts: blogPost.parts.length,
    totalParts: blogPost.totalParts,
    title: blogPost.title
  };
}

/**
 * List all draft blog posts
 */
export function listDraftBlogPosts(): Array<{
  blogId: string;
  title: string;
  status: string;
  parts: number;
  totalParts?: number;
  date: string;
}> {
  return Array.from(draftBlogPosts.values()).map(blog => ({
    blogId: blog.blogId,
    title: blog.title,
    status: blog.status,
    parts: blog.parts.length,
    totalParts: blog.totalParts,
    date: blog.date
  }));
}

/**
 * Force publish a blog post (even if not complete)
 */
export async function forcePublishBlogPost(blogId: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const blogPost = draftBlogPosts.get(blogId);
    
    if (!blogPost) {
      return {
        success: false,
        message: 'Blog post not found'
      };
    }
    
    if (blogPost.parts.length === 0) {
      return {
        success: false,
        message: 'No parts to publish'
      };
    }
    
    blogPost.status = 'complete';
    await publishMultiPartBlogPost(blogPost);
    
    return {
      success: true,
      message: `Blog post "${blogPost.title}" published successfully`
    };
    
  } catch (error) {
    console.error('Error force publishing blog post:', error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
