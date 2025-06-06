const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Configure Nodemailer transporter

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address (store in environment variable)
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password (store in environment variable)
  },
});

// POST endpoint for sending email
router.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email options

  const mailOptions = {
    from: `"${name} via Contact Form" <${process.env.EMAIL_USER}>`, // Sender address
    to: "bhanushalisahil.dev@gmail.com", // Recipient address (your email)
    subject: `New Contact Form Submission by: ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
