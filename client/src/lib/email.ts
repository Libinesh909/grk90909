// This file provides email utility functions for the client-side
// Note: Actual email sending happens on the server-side

export interface EmailData {
  to: string;
  subject: string;
  message: string;
  name?: string;
  email?: string;
}

export interface RegistrationEmailData {
  username: string;
  email: string;
  phone: string;
  preferredGame: string;
  experience?: string;
}

// Format registration data for email
export function formatRegistrationEmail(data: RegistrationEmailData): string {
  return `
New Player Registration - GRK Gaming Platform

Player Details:
- Username: ${data.username}
- Email: ${data.email}
- Phone: ${data.phone}
- Preferred Game: ${data.preferredGame}
- Experience: ${data.experience || 'Not provided'}

Registration Time: ${new Date().toLocaleString()}

This registration was submitted through the GRK gaming platform.
Please verify the player details and confirm their registration.

---
Gaming Republic of Kanniyakumari (GRK)
  `.trim();
}

// Format contact form data for email
export function formatContactEmail(data: EmailData): string {
  return `
Contact Form Submission - GRK Gaming Platform

Contact Details:
- Name: ${data.name || 'Not provided'}
- Email: ${data.email || 'Not provided'}
- Subject: ${data.subject}

Message:
${data.message}

Submission Time: ${new Date().toLocaleString()}

---
Gaming Republic of Kanniyakumari (GRK)
  `.trim();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  if (cleanPhone.startsWith('+91') || cleanPhone.startsWith('91')) {
    return cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;
  }
  if (cleanPhone.length === 10) {
    return `+91${cleanPhone}`;
  }
  return phone;
}

// Constants for email configuration
export const EMAIL_CONFIG = {
  REGISTRATION_EMAIL: process.env.REGISTRATION_EMAIL || "libineshr7@gmail.com",
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || "libineshr7@gmail.com",
  PAYMENT_NUMBER: "9514159632@fam",
  TOURNAMENT_FEE: 10,
  SUBMISSION_DEADLINE_HOURS: 48,
} as const;

// Email templates
export const EMAIL_TEMPLATES = {
  REGISTRATION_SUCCESS: {
    subject: "Registration Successful - GRK Gaming Platform",
    message: "Welcome to the Gaming Republic of Kanniyakumari! Your registration has been received and is being processed. You will receive a confirmation email within 24 hours."
  },
  PAYMENT_RECEIVED: {
    subject: "Payment Received - Tournament Registration",
    message: "Your payment has been received and is being verified. You will receive confirmation within 24 hours once your payment is verified."
  },
  TOURNAMENT_REMINDER: {
    subject: "Tournament Starting Soon - GRK",
    message: "Your registered tournament is starting soon. Please be ready and follow the tournament guidelines."
  }
} as const;
