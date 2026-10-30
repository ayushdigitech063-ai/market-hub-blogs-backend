const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const submissionController = require("../Controller/submissionController");

// PUBLIC: Submit a new blog
router.post("/", submissionController.createSubmission);

// ADMIN: Get pending submissions count
router.get("/count", protect, submissionController.getPendingCount);

// ADMIN: Get all submissions
router.get("/", protect, submissionController.listSubmissions);

// PUBLIC: Check submission status
router.get("/:id", submissionController.getSubmissionStatus);

// ADMIN: Approve a submission
router.put("/:id/approve", protect, submissionController.approveSubmission);

// ADMIN: Reject a submission
router.put("/:id/reject", protect, submissionController.rejectSubmission);

module.exports = router;