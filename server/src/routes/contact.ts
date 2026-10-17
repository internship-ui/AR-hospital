import { Router, Request, Response } from 'express';
import { queryAll, queryOne, execute } from '../db';

const router = Router();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/contact - Submit enquiry
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your full name (at least 2 characters).'
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address so our team can respond.'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your enquiry message (at least 5 characters).'
      });
    }

    execute(
      `INSERT INTO contact_inquiries (name, email, phone, subject, message, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        email.trim(),
        phone ? phone.trim() : null,
        subject ? subject.trim() : 'General Enquiry',
        message.trim(),
        'Unread'
      ]
    );

    console.log(`📩 New contact enquiry from: ${name} (${email})`);

    return res.status(201).json({
      success: true,
      message: 'Thank you. Your message has been received by AR Hospital Patient Relations. We will respond promptly.'
    });
  } catch (error: any) {
    console.error('Error submitting contact enquiry:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while submitting your message. Please try again.'
    });
  }
});

// GET /api/contact - List inquiries (Admin view)
router.get('/', (req: Request, res: Response) => {
  try {
    const inquiries = queryAll('SELECT * FROM contact_inquiries ORDER BY id DESC');
    return res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error: any) {
    console.error('Error fetching contact inquiries:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve contact inquiries.'
    });
  }
});

export default router;
