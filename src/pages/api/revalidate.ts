import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // This endpoint can be called by Tribute webhooks or cron jobs
    // to trigger regeneration of the shop page
    
    const body = await request.json();
    const secret = body.secret;
    
    // Verify the secret to prevent unauthorized revalidation
    if (secret !== import.meta.env.REVALIDATE_SECRET) {
      return new Response(JSON.stringify({ error: 'Invalid secret' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // In a real implementation, you would trigger Vercel's revalidation here
    // For now, we'll just return success
    console.log('Revalidation triggered for shop page');
    
    return new Response(JSON.stringify({ 
      revalidated: true,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Revalidation error:', error);
    
    return new Response(JSON.stringify({ error: 'Revalidation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
