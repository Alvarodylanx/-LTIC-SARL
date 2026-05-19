import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const host = process.env.MAIL_HOST;
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.MAIL_PORT || 587),
        secure: process.env.MAIL_SECURE === 'true',
        auth: { user, pass },
      });
    } else {
      this.logger.warn('Email not configured — set MAIL_HOST, MAIL_USER, MAIL_PASS to enable email notifications');
    }
  }

  async sendAdminNotification(subject: string, html: string): Promise<void> {
    if (!this.transporter) return;
    const to = process.env.ADMIN_EMAIL || process.env.MAIL_USER;
    const from = process.env.MAIL_FROM || process.env.MAIL_USER;
    try {
      await this.transporter.sendMail({ from: `"LTIC SARL" <${from}>`, to, subject, html });
    } catch (err: any) {
      this.logger.error(`Failed to send email: ${err.message}`);
    }
  }

  quoteEmail(quote: any): string {
    return `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#1a56db">New Quote Request — LTIC SARL</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#6b7280">Name</td><td style="padding:6px 0;font-weight:600">${quote.name ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Company</td><td style="padding:6px 0">${quote.company ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0">${quote.email ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Phone</td><td style="padding:6px 0">${quote.phone ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Country</td><td style="padding:6px 0">${quote.country ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Service</td><td style="padding:6px 0">${quote.serviceType ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Message</td><td style="padding:6px 0">${quote.message ?? '—'}</td></tr>
        </table>
        <p style="margin-top:24px"><a href="${process.env.NEXT_PUBLIC_API_URL?.replace(':4000', ':3000') ?? 'http://localhost:3000'}/admin/quotes" style="background:#1a56db;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">View in Admin Panel</a></p>
      </div>`;
  }

  contactEmail(contact: any): string {
    return `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#1a56db">New Contact Message — LTIC SARL</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#6b7280">Name</td><td style="padding:6px 0;font-weight:600">${contact.name ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0">${contact.email ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Phone</td><td style="padding:6px 0">${contact.phone ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Subject</td><td style="padding:6px 0">${contact.subject ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Message</td><td style="padding:6px 0">${contact.message ?? '—'}</td></tr>
        </table>
        <p style="margin-top:24px"><a href="${process.env.NEXT_PUBLIC_API_URL?.replace(':4000', ':3000') ?? 'http://localhost:3000'}/admin/contacts" style="background:#1a56db;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">View in Admin Panel</a></p>
      </div>`;
  }
}
