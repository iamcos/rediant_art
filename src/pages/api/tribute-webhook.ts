import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    console.log('Received Tribute webhook:', JSON.stringify(body, null, 2));
    
    // Handle different webhook events from Tribute
    if (body.event === 'product.created' || body.event === 'product.updated') {
      console.log('Product updated:', body.data);
      // Here you could update your database or cache
    }
    
    if (body.event === 'product.deleted') {
      console.log('Product deleted:', body.data);
      // Here you could remove from your database or cache
    }
    
    // Always return 200 to acknowledge receipt
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Webhook received successfully',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Webhook processing failed' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// Handle GET requests for webhook verification
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ 
    message: 'Tribute webhook endpoint is active',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
