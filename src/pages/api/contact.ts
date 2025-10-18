import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../utils/email';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validation = contactSchema.safeParse(body);
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

    const { name, email, subject, message } = validation.data;

    // Send the email
    await sendContactEmail({
      name,
      email,
      subject,
      message
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
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
