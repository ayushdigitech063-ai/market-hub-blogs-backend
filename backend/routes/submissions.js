const express = require("express");
const router = express.Router();
const ctrl = require("../Controller/submissionController");
const auth = require("../middleware/authMiddleware");

router.post("/", ctrl.createSubmission);
router.get("/count", auth, ctrl.getPendingCount);
router.get("/", auth, ctrl.listSubmissions);
router.get("/:id", ctrl.getSubmissionStatus);
router.put("/:id/approve", auth, ctrl.approveSubmission);
router.put("/:id/reject", auth, ctrl.rejectSubmission);

module.exports = router;