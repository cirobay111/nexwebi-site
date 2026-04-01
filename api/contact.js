import nodemailer from 'nodemailer';

const RATE_LIMIT = new Map(); // ip -> timestamp
const COOLDOWN_MS = 60_000;

function sanitize(str = '') {
  return str.replace(/[<>"'`]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;' }[c])
  );
}

function validateEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Rate limiting by IP
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const lastCall = RATE_LIMIT.get(ip) || 0;
  if (Date.now() - lastCall < COOLDOWN_MS) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please wait a minute.' });
  }

  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, error: 'Valid email is required.' });
  }
  if (!message || message.trim().length < 20) {
    return res.status(400).json({ success: false, error: 'Message must be at least 20 characters.' });
  }

  // Sanitize inputs
  const safeName    = sanitize(name.trim().slice(0, 100));
  const safeEmail   = sanitize(email.trim().slice(0, 254));
  const safeSubject = sanitize((subject || '').trim().slice(0, 200));
  const safeMessage = sanitize(message.trim().slice(0, 2000));

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NexWebi Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: safeSubject ? `[NexWebi] ${safeSubject}` : `[NexWebi] New message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#22d3ee;border-bottom:1px solid #eee;padding-bottom:12px">
            New message from NexWebi
          </h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${safeSubject ? `<p><strong>Subject:</strong> ${safeSubject}</p>` : ''}
          <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-radius:8px;white-space:pre-wrap">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    RATE_LIMIT.set(ip, Date.now());
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
  }
}
