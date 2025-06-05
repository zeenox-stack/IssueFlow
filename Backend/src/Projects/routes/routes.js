const express = require("express");

const router = express.Router();
const {
  handleProjectCreation,
  getProjects,
  getProjectData,
  handleUpdateProject,
  handleDeleteProject,
} = require("../controller/controller");
const issueRoutes = require("../../Issues/routes/routes");

router.post("/create", handleProjectCreation);
router.get("/get", getProjects);
router.get("/:id", getProjectData);
router.patch("/:id", handleUpdateProject);
router.delete("/:id", handleDeleteProject);
router.use("/:projectId/issues", issueRoutes);

module.exports = router;
