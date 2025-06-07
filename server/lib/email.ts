import { MailService } from '@sendgrid/mail';

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('EMAIL SENT (Development Mode - No SendGrid API Key):');
      console.log('To:', params.to);
      console.log('Subject:', params.subject);
      console.log('Text:', params.text);
      return true;
    }

    const mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);

    const mailOptions = {
      to: params.to,
      from: 'noreply@grk-gaming.com',
      subject: params.subject,
      text: params.text,
      html: params.html,
    };

    await mailService.send(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}
