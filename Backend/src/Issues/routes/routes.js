const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  handleGetIssues,
  handleIssueCreation,
  handleIssueUpdates,
  handleIssueDelete,
  handleGetIssueById,
} = require("../controller/controller");

router.post("/create", handleIssueCreation);
router.get("/get", handleGetIssues);
router.patch("/:id", handleIssueUpdates);
router.delete("/:id", handleIssueDelete);
router.get("/:id", handleGetIssueById);

module.exports = router;
