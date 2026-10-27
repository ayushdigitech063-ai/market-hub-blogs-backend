const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const norm = (email) => String(email || "").trim().toLowerCase();

const hash = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");

const OTP_TTL = 10 * 60 * 1000;
const VERIFIED_TTL = 30 * 60 * 1000;
const RESEND_COOLDOWN = 60 * 1000;
const MAX_TRIES = 5;

const otps = new Map();
const verifiedEmails = new Map();

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const BRAND = "Market Hub";

/* ---------- Mail bhejna (Brevo HTTP API, port 443 par chalta hai) ---------- */

const sendMail = async ({ to, subject, text, html }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.MAIL_FROM;

  if (!apiKey || !fromEmail) {
    throw new Error("Mail configuration missing. Set BREVO_API_KEY and MAIL_FROM in backend/.env.");
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: BRAND, email: fromEmail },
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo API ${res.status}: ${body}`);
  }

  return res.json().catch(() => ({}));
};

/* ---------- Email template ---------- */

const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

// accent: header + badge ka color, badge: chhota label, box: extra highlighted HTML
const renderEmail = ({ preheader, accent = "#f97316", badge, heading, name, lines = [], box = "", note = "" }) => `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#fff7ed;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader || heading)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #fed7aa;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${accent};padding:22px 28px;">
              <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.3px;">${BRAND}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px 8px 28px;">
              ${
                badge
                  ? `<span style="display:inline-block;background:#fff7ed;color:${accent};border:1px solid ${accent};border-radius:999px;padding:4px 12px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${esc(badge)}</span>`
                  : ""
              }
              <h1 style="margin:14px 0 0 0;font-size:24px;line-height:1.3;color:#0f172a;">${esc(heading)}</h1>
              <p style="margin:18px 0 0 0;font-size:15px;line-height:1.6;color:#334155;">Hi ${esc(name || "there")},</p>
              ${lines
                .map(
                  (l) =>
                    `<p style="margin:12px 0 0 0;font-size:15px;line-height:1.6;color:#334155;">${l}</p>`
                )
                .join("")}
              ${box}
              ${
                note
                  ? `<p style="margin:22px 0 0 0;font-size:12px;line-height:1.5;color:#94a3b8;">${esc(note)}</p>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 30px 28px;">
              <hr style="border:none;border-top:1px solid #fed7aa;margin:0 0 16px 0;" />
              <p style="margin:0;font-size:13px;color:#64748b;">Thank you for contributing to <strong style="color:#0f172a;">${BRAND}</strong>.</p>
              <p style="margin:6px 0 0 0;font-size:11px;color:#94a3b8;">This is an automated email, please do not reply.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const titleBox = (title, accent) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 0 0;">
     <tr>
       <td style="background:#fff7ed;border-left:4px solid ${accent};border-radius:8px;padding:14px 16px;">
         <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#94a3b8;">Your blog</div>
         <div style="margin-top:4px;font-size:16px;font-weight:700;color:#0f172a;">${esc(title || "")}</div>
       </td>
     </tr>
   </table>`;

const otpBox = (code) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 0 0;">
     <tr>
       <td align="center" style="background:#fff7ed;border:1px dashed #f97316;border-radius:12px;padding:20px;">
         <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#94a3b8;">Your OTP</div>
         <div style="margin-top:8px;font-size:34px;font-weight:800;letter-spacing:10px;color:#ea580c;">${esc(code)}</div>
         <div style="margin-top:8px;font-size:12px;color:#64748b;">Valid for 10 minutes</div>
       </td>
     </tr>
   </table>`;

/* ---------- Routes ---------- */

// POST /api/otp/send
router.post("/send", async (req, res) => {
  const email = norm(req.body?.email);

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Please enter a valid email address.",
    });
  }

  const previous = otps.get(email);

  if (
    previous?.sentAt &&
    Date.now() - previous.sentAt < RESEND_COOLDOWN
  ) {
    return res.status(429).json({
      error: "Please wait 60 seconds before requesting another OTP.",
    });
  }

  const code = String(crypto.randomInt(100000, 1000000));

  try {
    await sendMail({
      to: email,
      subject: "Your Market Hub verification code",
      text: `Your Market Hub OTP is ${code}.

This code is valid for 10 minutes.
Do not share this code with anyone.`,
      html: renderEmail({
        preheader: `Your Market Hub OTP is ${code}`,
        badge: "Verification",
        heading: "Verify your email",
        lines: ["Use the code below to verify your email address and continue posting your blog."],
        box: otpBox(code),
        note: "Do not share this code with anyone. If you did not request it, you can ignore this email.",
      }),
    });

    otps.set(email, {
      hash: hash(code),
      expires: Date.now() + OTP_TTL,
      sentAt: Date.now(),
      tries: 0,
    });

    verifiedEmails.delete(email);

    return res.json({
      ok: true,
      message: "OTP sent successfully.",
    });
  } catch (err) {
    // Asli error backend terminal mein dikhega.
    console.error("OTP email error:", err.message);

    // TEMP (debug): asli reason screen par dikhane ke liye. Sab theek hone ke baad hata dena.
    return res.status(500).json({
      error: `Could not send OTP. (${err.message})`,
    });
  }
});

// POST /api/otp/verify
router.post("/verify", (req, res) => {
  const email = norm(req.body?.email);
  const otp = String(req.body?.otp || "").trim();

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Please enter a valid email address.",
    });
  }

  const rec = otps.get(email);

  if (!rec || rec.expires <= Date.now()) {
    otps.delete(email);

    return res.status(400).json({
      error: "OTP expired. Please request a new OTP.",
    });
  }

  if (rec.tries >= MAX_TRIES) {
    otps.delete(email);

    return res.status(429).json({
      error: "Too many attempts. Please request a new OTP.",
    });
  }

  rec.tries += 1;

  if (!/^\d{6}$/.test(otp) || rec.hash !== hash(otp)) {
    return res.status(400).json({
      error: "Invalid OTP.",
    });
  }

  otps.delete(email);
  verifiedEmails.set(email, Date.now() + VERIFIED_TTL);

  return res.json({
    ok: true,
    message: "Email verified successfully.",
  });
});

// POST /api/otp/submitted  (form submit hone ke baad confirmation mail)
router.post("/submitted", (req, res) => {
  const email = norm(req.body?.email);
  const name = String(req.body?.name || "").trim();

  if (!isVerified(email)) {
    return res.status(403).json({ error: "Email not verified." });
  }

  verifiedEmails.delete(email);
  res.json({ ok: true });

  sendPendingMail(email, name).catch((err) =>
    console.error("Pending mail error:", err.message)
  );
});


router.post("/decision", async (req, res) => {
  try {
    const Submission = require("../models/Submission");
    const s = await Submission.findById(req.body?.id);

    if (!s) return res.status(404).json({ error: "Submission not found." });
    if (!["approved", "rejected"].includes(s.status)) {
      return res.status(400).json({ error: "Submission has no decision yet." });
    }

    res.json({ ok: true });

    sendDecisionMail(s.email, s.name, s.title, s.status).catch((err) =>
      console.error("Decision mail error:", err.message)
    );
  } catch (err) {
    console.error("Decision route error:", err.message);
    res.status(500).json({ error: "Could not send mail." });
  }
});

const isVerified = (email) => {
  const normalized = norm(email);
  const expiry = verifiedEmails.get(normalized);

  if (!expiry || expiry <= Date.now()) {
    verifiedEmails.delete(normalized);
    return false;
  }

  return true;
};

const sendPendingMail = async (email, name) =>
  sendMail({
    to: norm(email),
    subject: "Your blog has been submitted",
    text: `Hi ${name || "there"},

Your form has been submitted. Your blog is under review and our team will contact you as soon as possible.

Thank you for contributing to Market Hub.`,
    html: renderEmail({
      preheader: "Your form has been submitted and your blog is under review.",
      accent: "#f97316",
      badge: "Submitted",
      heading: "Your blog has been submitted",
      name,
      lines: [
        "Your form has been submitted successfully. Your blog is <strong>under review</strong>.",
        "Our team will contact you as soon as possible.",
      ],
    }),
  });

const sendDecisionMail = async (email, name, title, status) => {
  const approved = status === "approved";
  const accent = approved ? "#16a34a" : "#e11d48";

  return sendMail({
    to: norm(email),
    subject: approved ? "Your blog is successfully posted" : "Your blog is rejected",
    text: approved
      ? `Hi ${name || "there"},

Your blog "${title || ""}" is successfully posted on Market Hub.

Thank you for contributing.`
      : `Hi ${name || "there"},

Your blog "${title || ""}" is rejected.

Thank you for submitting.`,
    html: renderEmail({
      preheader: approved ? "Your blog is successfully posted." : "Your blog is rejected.",
      accent,
      badge: approved ? "Posted" : "Rejected",
      heading: approved ? "Your blog is successfully posted" : "Your blog is rejected",
      name,
      lines: [
        approved
          ? "Great news! Your blog has been reviewed and is now <strong>live on Market Hub</strong>."
          : "Thank you for submitting your blog. After review, it has been <strong>rejected</strong>.",
      ],
      box: titleBox(title, accent),
    }),
  });
};

module.exports = {
  router,
  isVerified,
  sendPendingMail,
};