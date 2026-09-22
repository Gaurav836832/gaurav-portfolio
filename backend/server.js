// backend/server.js
import express from "express";
import cors from "cors";
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

// --- Mail via Resend (HTTPS API, not SMTP) ---
// Render's free tier blocks outbound SMTP ports (465/587), so we send mail
// through Resend's HTTPS API instead of nodemailer+Gmail SMTP.
// Get a free API key at https://resend.com/api-keys
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is not set in environment variables");
} else {
  console.log("✅ Resend API key loaded, ready to send messages");
}

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

    if (!RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Server email configuration is missing.",
      });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // onboarding@resend.dev works without verifying a domain, but can
        // only deliver to the email address you signed up to Resend with.
        // Once you verify your own domain on Resend, replace this with
        // something like "Portfolio <contact@yourdomain.com>".
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [process.env.RECEIVER_EMAIL || process.env.EMAIL_USER],
        reply_to: email,
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
      }),
    });

    if (!resendResponse.ok) {
      const errBody = await resendResponse.json().catch(() => ({}));
      console.error("❌ Resend API error:", resendResponse.status, errBody);
      return res.status(502).json({
        success: false,
        error: "Failed to send message via email provider.",
      });
    }

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
