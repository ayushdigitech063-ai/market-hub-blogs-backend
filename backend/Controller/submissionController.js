const mongoose = require("mongoose");
const sanitizeHtml = require("sanitize-html");
const nodemailer = require("nodemailer");
const Submission = require("../models/Submission");
const Admin = require("../models/Admin");

// Mail bhejne wala Gmail account (sirf yahi 2 cheezein badalni hain)
const MAIL_USER = "yourgmail@gmail.com";
const MAIL_PASS = "your16letterapppassword";

const TYPES = [
  "biographies", "brands", "slidingCompanies", "latestArticles",
  "articles", "blogArticles", "companies",
];


const CLEAN = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "strong", "b", "em", "i", "u", "s",
    "strike", "a", "ul", "ol", "li", "blockquote", "pre", "code", "span", "div", "img",
    "iframe", "table", "thead", "tbody", "tr", "th", "td", "figure", "figcaption", "sub", "sup",
  ],
  allowedAttributes: {
    "*": ["class", "style"],
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
    iframe: ["src", "width", "height", "allowfullscreen", "frameborder"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan"],
  },
  allowedStyles: {
    "*": {
      color: [/^[#(),.%\w\s-]+$/],
      "background-color": [/^[#(),.%\w\s-]+$/],
      "text-align": [/^(left|right|center|justify)$/],
    },
  },
  allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

const validId = (id) => mongoose.Types.ObjectId.isValid(id);

const esc = (s) =>
  String(s || "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

// Naya blog aane par jo admin(s) Admin collection me hain unke mail pe details bhejta hai.
// Mail fail ho jaye to bhi blog submit par koi asar nahi padta.
const sendAdminMail = async (sub) => {
  try {
    const admins = await Admin.find().select("email");
    const to = admins.map((a) => a.email).filter(Boolean);
    if (!to.length) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Blog Submissions" <${MAIL_USER}>`,
      to,
      replyTo: sub.email,
      subject: `New blog submission: ${sub.title}`,
      html: `
        <h3>New Blog Submission</h3>
        <p><b>Name:</b> ${esc(sub.name)}</p>
        <p><b>Email:</b> ${esc(sub.email)}</p>
        <p><b>Category:</b> ${esc(sub.category)}</p>
        <p><b>Post Type:</b> ${esc(sub.postType)}</p>
        <p><b>Blog Title:</b> ${esc(sub.title)}</p>
        <p><b>Status:</b> ${esc(sub.status)}</p>
      `,
    });
  } catch (err) {
    console.error("Admin mail failed:", err.message);
  }
};

exports.createSubmission = async (req, res) => {
  try {
    const { name, email, postType, form } = req.body || {};
    if (!String(name || "").trim() || !/^\S+@\S+\.\S+$/.test(String(email || ""))) {
      return res.status(400).json({ error: "Please enter a valid name and email." });
    }
    if (!TYPES.includes(postType)) {
      return res.status(400).json({ error: "Invalid post category." });
    }
    if (!form || typeof form !== "object" || Array.isArray(form)) {
      return res.status(400).json({ error: "Blog data is missing." });
    }

    const clean = { ...form };
    clean.title = String(clean.title || "").trim();
    clean.category = String(clean.category || "").trim();
    clean.contentHtml = sanitizeHtml(String(clean.contentHtml || ""), CLEAN);

    if (!clean.title || !clean.category || !clean.contentHtml.trim()) {
      return res.status(400).json({ error: "Title, category and content are required." });
    }

    const sub = await Submission.create({
      name,
      email,
      postType,
      title: clean.title,
      category: clean.category,
      form: clean,
    });

    sendAdminMail(sub);

    res.status(201).json({ id: sub._id, status: sub.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not submit blog." });
  }
};


exports.getSubmissionStatus = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(404).json({ error: "Not found" });
    const sub = await Submission.findById(req.params.id).select("title status");
    if (!sub) return res.status(404).json({ error: "Not found" });
    res.json({ title: sub.title, status: sub.status });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.listSubmissions = async (req, res) => {
  try {
    const filter = ["pending", "approved", "rejected"].includes(req.query.status)
      ? { status: req.query.status }
      : {};
    res.json(await Submission.find(filter).sort({ createdAt: -1 }).lean());
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getPendingCount = async (req, res) => {
  try {
    res.json({ pending: await Submission.countDocuments({ status: "pending" }) });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.approveSubmission = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(404).json({ error: "Not found" });
    const sub = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: "approved", reviewedAt: new Date() }
    ).select("_id");
    if (!sub) return res.status(404).json({ error: "Not found" });
    res.json({ status: "approved" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.rejectSubmission = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(404).json({ error: "Not found" });
    const sub = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", reviewedAt: new Date() }
    ).select("_id");
    if (!sub) return res.status(404).json({ error: "Not found" });
    res.json({ status: "rejected" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};