import type { APIRoute } from 'astro';
import { getBlogPostStatus, listDraftBlogPosts, forcePublishBlogPost } from '../../utils/multi-part-blog';

export const GET: APIRoute = async ({ url }) => {
  try {
    const blogId = url.searchParams.get('blogId');
    
    if (blogId) {
      // Get status of specific blog post
      const status = getBlogPostStatus(blogId);
      return new Response(JSON.stringify(status), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // List all draft blog posts
      const drafts = listDraftBlogPosts();
      return new Response(JSON.stringify({ drafts }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error getting blog status:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get blog status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { action, blogId } = body;
    
    if (action === 'force-publish' && blogId) {
      const result = await forcePublishBlogPost(blogId);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify({ 
      error: 'Invalid action or missing blogId'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing blog action:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process blog action',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};









