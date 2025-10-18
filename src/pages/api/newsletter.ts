import type { APIRoute } from 'astro';
import { sendNewsletterConfirmation } from '../../utils/email';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Valid email is required'),
  name: z.string().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validation.error.errors.map(err => ({
            field: err.path[0],
            message: err.message
          }))
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const { email, name } = validation.data;

    // Send the confirmation email
    await sendNewsletterConfirmation({
      email,
      name: name || 'Friend'
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Welcome to the Rediant Art community! Check your email for confirmation.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Sorry, there was an error signing you up. Please try again or contact us directly.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
