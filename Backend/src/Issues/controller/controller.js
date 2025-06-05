const Issues = require("../../Database/models/Issues");
const Projects = require("../../Database/models/Projects");

const handleIssueCreation = async (req, res) => {
  const { _id: createdBy, githubId } = req.user;
  const { projectId } = req.params;
  const { title, description } = req.body;

  try {
    if (!projectId || !title || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!createdBy) {
      throw new Error("Missing id!");
    }

    const project = await Projects.findOne({ id: projectId });

    if (!project) {
      return res.status(404).json({ error: "Project id is non-existent" });
    }

    if (project.ownerId != (githubId || createdBy)) {
      return res
        .status(403)
        .json({ error: "Not authorized to add issues to this project" });
    }

    const issue = await Issues.create({
      projectId,
      title,
      description,
      createdBy,
    });

    if (!issue) {
      throw new Error("Couldn't create issues");
    }

    res.status(201).json({ success: "Successfully created the issue", issue });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error couldn't create issue" });
  }
};

const handleIssueUpdates = async (req, res) => {
  const { id: issueId } = req.params;
  const { title, description, status } = req.body;

  try {
    if ((!title && !description && !status) || !issueId) {
      return res.status(400).json({ error: "missing fields" });
    }

    const issue = await Issues.findOne({ id: issueId });
    const toUpdate = {};

    if (!issue) {
      return res.status(404).json({ error: "Issue was not found" });
    }

    if (title !== issue.title) toUpdate.title = title;
    if (description !== issue.description) toUpdate.description = description;
    if (status !== issue.status) toUpdate.status = status;

    if (Object.keys(toUpdate).length === 0) {
      return res.status(400).json({ error: "No valid changes provided" });
    }

    const updatedIssue = await Issues.updateOne(
      { id: issue.id },
      { ...toUpdate, updatedAt: Date.now() }
    );

    res
      .status(200)
      .json({ success: "Successfully updated issue", issue: updatedIssue });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "Error updating the issue" });
  }
};

const handleIssueDelete = async (req, res) => {
  const { id: issueId } = req.params;

  try {
    if (!issueId) {
      return res.status(400).json({ error: "Mssing issue id" });
    }

    const issue = await Issues.deleteOne({ id: issueId });

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res
      .status(200)
      .json({ success: "Successfuly deleted the issue", id: issue.id });
  } catch (error) {
    console.error("Error :", error);
    return res.status(500).json({ error: "Error deleting the issue" });
  }
};

const handleGetIssues = async (req, res) => {
  const { projectId } = req.params;

  try {
    if (!projectId) {
      return res.status(400).json({ error: "Error project id is missing" });
    }

    const issues = await Issues.find({ projectId });

    if (!issues) {
      return res.status(404).json({ error: "Couldn't find issues" });
    }

    res.status(200).json({ success: "Successfully fetched issues", issues });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "Error fetching issues" });
  }
};

const handleGetIssueById = async (req, res) => {
  const { id: issueId } = req.params;

  try {
    if (!issueId) {
      console.error("Missing issue id");
      return res.status(400).json({ error: "Missing issue Id" });
    }

    const issue = await Issues.findOne({ id: issueId });

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res.status(200).json({ success: "Sussfully fetched issue", issue });
  } catch (error) {
    console.error("Error occured: ", error);
    return res.status(500).json({ error: "Error fetching issue" });
  }
};

module.exports = {
  handleGetIssues,
  handleIssueCreation,
  handleIssueUpdates,
  handleIssueDelete,
  handleGetIssueById,
};
