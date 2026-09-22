// backend/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS ---
// FRONTEND_URL should be your deployed Render Static Site URL, e.g.
// https://gaurav-portfolio.onrender.com
// You can comma-separate multiple origins if needed (e.g. local dev + prod).
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS: " + origin));
    },
  })
);

app.use(express.json());

// --- Mail transporter ---
// Uses Gmail + an App Password (NOT your normal Gmail password).
// See README.md for how to generate one.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // 16-char Gmail App Password
  },
});

// Verify transporter config on boot (logs a clear error early if creds are wrong)
transporter.verify((error) => {
  if (error) {
    console.error("❌ Mail transporter failed to verify:", error.message);
  } else {
    console.log("✅ Mail transporter is ready to send messages");
  }
});

// --- Health check (useful for Render + uptime pings) ---
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});

// --- Contact form endpoint ---
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Message from ${name}: ${subject || "Portfolio Inquiry"}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "Portfolio Inquiry"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "Portfolio Inquiry"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; padding: 12px; background: #f5f5f5; border-radius: 8px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("❌ Error sending mail:", err.message);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
