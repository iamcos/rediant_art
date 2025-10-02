import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    console.log('Received Tribute Webhook:', payload);

    // Trigger Vercel redeploy by calling Vercel's deployment API
    // You'll need to set VERCEL_TOKEN environment variable
    const vercelToken = import.meta.env.VERCEL_TOKEN;
    const vercelProjectId = import.meta.env.VERCEL_PROJECT_ID;
    
    if (vercelToken && vercelProjectId) {
      try {
        const deployResponse = await fetch(`https://api.vercel.com/v1/integrations/deploy/${vercelProjectId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${vercelToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (deployResponse.ok) {
          console.log('Successfully triggered Vercel redeploy');
        } else {
          console.error('Failed to trigger Vercel redeploy:', await deployResponse.text());
        }
      } catch (error) {
        console.error('Error triggering Vercel redeploy:', error);
      }
    } else {
      console.log('Vercel credentials not configured, skipping auto-redeploy');
    }

    return new Response(JSON.stringify({ 
      message: 'Webhook received successfully',
      timestamp: new Date().toISOString()
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