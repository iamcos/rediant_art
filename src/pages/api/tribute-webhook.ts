import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    console.log('Received Tribute Webhook:', JSON.stringify(payload, null, 2));

    // Check if this is a product-related webhook
    const isProductUpdate = payload.type === 'product_created' || 
                           payload.type === 'product_updated' || 
                           payload.type === 'product_deleted' ||
                           payload.event === 'product_change';

    if (!isProductUpdate) {
      console.log('Non-product webhook received, skipping regeneration');
      return new Response(JSON.stringify({ 
        message: 'Webhook received but not a product update',
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Product update detected, triggering regeneration...');

    // Method 1: Try to trigger Vercel redeploy (requires VERCEL_TOKEN)
    const vercelToken = import.meta.env.VERCEL_TOKEN;
    const vercelProjectId = import.meta.env.VERCEL_PROJECT_ID;
    
    if (vercelToken && vercelProjectId) {
      try {
        console.log('Attempting Vercel redeploy...');
        const deployResponse = await fetch(`https://api.vercel.com/v1/integrations/deploy/${vercelProjectId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${vercelToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (deployResponse.ok) {
          console.log('Successfully triggered Vercel redeploy');
          return new Response(JSON.stringify({ 
            message: 'Webhook received and Vercel redeploy triggered',
            timestamp: new Date().toISOString(),
            action: 'redeploy_triggered'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          console.error('Failed to trigger Vercel redeploy:', await deployResponse.text());
        }
      } catch (error) {
        console.error('Error triggering Vercel redeploy:', error);
      }
    }

    // Method 2: Fallback to revalidation endpoint
    const revalidateSecret = import.meta.env.REVALIDATE_SECRET;
    if (revalidateSecret) {
      try {
        console.log('Attempting revalidation...');
        const revalidateResponse = await fetch(`${new URL(request.url).origin}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ secret: revalidateSecret })
        });

        if (revalidateResponse.ok) {
          console.log('Successfully triggered revalidation');
          return new Response(JSON.stringify({ 
            message: 'Webhook received and revalidation triggered',
            timestamp: new Date().toISOString(),
            action: 'revalidation_triggered'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          console.error('Failed to trigger revalidation:', await revalidateResponse.text());
        }
      } catch (error) {
        console.error('Error triggering revalidation:', error);
      }
    }

    // If both methods fail, still return success but log the issue
    console.log('No regeneration method available, webhook received but no action taken');
    return new Response(JSON.stringify({ 
      message: 'Webhook received but no regeneration method configured',
      timestamp: new Date().toISOString(),
      action: 'no_action'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error processing Tribute Webhook:', error);
    return new Response(JSON.stringify({ 
      error: `Failed to process webhook: ${error.message}`,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};