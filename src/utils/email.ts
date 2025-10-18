import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
  name?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Rediant Art <contact@rediant.art>',
      to: ['contact@rediant.art'],
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #D4AF37;">
            <h3 style="color: #2C2C2C; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #2C2C2C; color: white; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px;">
              This message was sent from the Rediant Art contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendNewsletterConfirmation(data: NewsletterData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Rediant Art <newsletter@rediant.art>',
      to: [data.email],
      subject: 'Welcome to Rediant Art Community',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 100%); color: white;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 2.5rem;">Rediant Art</h1>
            <p style="margin: 10px 0 0 0; font-size: 1.2rem;">Contemporary Jewelry Innovation</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #2C2C2C; margin-bottom: 20px;">Welcome to Our Community!</h2>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining the Rediant Art community! You'll now receive:
            </p>
            
            <ul style="color: #333; line-height: 1.8; margin-bottom: 30px;">
              <li>Exclusive access to new collections</li>
              <li>Behind-the-scenes content from our studio</li>
              <li>Special offers and early access to limited editions</li>
              <li>Updates on our 3D printing innovation</li>
            </ul>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="color: #D4AF37; margin-top: 0;">Connect With Us</h3>
              <p style="margin-bottom: 10px;">
                <strong>Instagram:</strong> <a href="https://instagram.com/mizyre" style="color: #D4AF37;">@mizyre</a>
              </p>
              <p style="margin-bottom: 10px;">
                <strong>Telegram:</strong> <a href="https://t.me/mizyre" style="color: #D4AF37;">@mizyre</a>
              </p>
              <p style="margin: 0;">
                <strong>WhatsApp:</strong> <a href="https://wa.me/79013157553" style="color: #D4AF37;">+7 901 315-75-53</a>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://rediant.art" style="background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Visit Our Website
              </a>
            </div>
          </div>
          
          <div style="background: #2C2C2C; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2024 Rediant Art. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">Contemporary jewelry where ancient inspiration meets modern innovation.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send confirmation email');
    }

    return result;
  } catch (error) {
    console.error('Newsletter confirmation error:', error);
    throw new Error('Failed to send confirmation email');
  }
}
