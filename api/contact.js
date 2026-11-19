import nodemailer from 'nodemailer';

const clean = (value, maxLength = 2000) =>
    typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_ENCRYPTION } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USERNAME || !SMTP_PASSWORD) {
        return res.status(503).json({ error: 'Email service is not configured' });
    }

    const name = clean(req.body?.name, 120);
    const email = clean(req.body?.email, 254);
    const phone = clean(req.body?.phone, 40);
    const restaurant = clean(req.body?.restaurant, 160);
    const city = clean(req.body?.city, 120);
    const message = clean(req.body?.message, 5000);

    // Strict regex validation
    const nameRegex = /^[a-zA-Z\s'.\-]{2,60}$/;
    if (!name || !nameRegex.test(name)) {
        return res.status(400).json({ error: 'Please enter a valid full name (letters only, min 2 characters)' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const isIndian = /^(?:\+91|0)?[6-9]\d{9}$/.test(cleanPhone);
    const isIntl = /^\+[1-9]\d{9,14}$/.test(cleanPhone);
    if (!cleanPhone || (!isIndian && !isIntl)) {
        return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number' });
    }

    if (!message || message.length < 10) {
        return res.status(400).json({ error: 'Please enter a message of at least 10 characters' });
    }

    const port = Number(SMTP_PORT);
    const secure = String(SMTP_ENCRYPTION).toLowerCase() === 'ssl' || port === 465;
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure,
        auth: { user: SMTP_USERNAME, pass: SMTP_PASSWORD },
        requireTLS: !secure
    });

    try {
        await transporter.sendMail({
            from: `RestroMind Website <${SMTP_USERNAME}>`,
            to: process.env.CONTACT_TO_EMAIL || 'innovexnow@gmail.com',
            replyTo: { name, address: email },
            subject: `Website inquiry from ${name}`,
            text: [
                `Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`,
                `Restaurant: ${restaurant || 'Not provided'}`, `City: ${city || 'Not provided'}`,
                '', 'Message:', message
            ].join('\n')
        });
        return res.status(200).json({ sent: true });
    } catch (error) {
        console.error('Contact email delivery failed:', error.message);
        return res.status(502).json({ error: 'Message delivery failed' });
    }
};
