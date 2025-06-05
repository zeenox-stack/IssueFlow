const Projects = require("../../Database/models/Projects");

const handleProjectCreation = async (req, res) => {
  const { title, description, id } = req.body;
  const { githubId: ownerId, username, id: userId } = req.user;

  if (!title || !description || !id) {
    return res.status(400).json({ error: "Missing Required Fields!" });
  }

  if (!id || !username) {
    console.error("Missing ID or Name");
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    const project = await Projects.create({
      id,
      title,
      description,
      ownerId: ownerId || userId,
    });

    res.status(201).json({
      success: "Successfully created the project",
      project: { ...project, ownerName: username },
    });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: "Error couldn't create project" });
  }
};

const getProjects = async (req, res) => {
  const { _id: id, githubId: ownerId, username: ownerName } = req.user;

  if (!id && !ownerId) {
    console.error("Missing ID");
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    const projects = await Projects.find({ ownerId: ownerId || id });

    res
      .status(200)
      .json({ success: "Successfully fetched projects", projects, ownerName });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: "Couldn't fetch projects" });
  }
};

const getProjectData = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    console.error("Missing ID");
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    const project = await Projects.findOne({ id: id });

    res.status(200).json({ success: "Successfully fetched project", project });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: "Error fetching project" });
  }
};

const handleUpdateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  console.log(id, title, description);

  try {
    if (!id) {
      return res.status(500).json({ error: "Missing ID!" });
    }

    if (!title && !description) {
      return res.status(400).json({ error: "No valid changes found" });
    }

    const project = await Projects.findOne({ id });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const toUpdate = {};

    if (title !== project.title) toUpdate.title = title;
    if (description !== project.description) toUpdate.description = description;

    if (Object.keys(toUpdate).length === 0) {
      return res.status(400).json({ error: "No updates found" });
    }

    const updatedProject = await Projects.updateOne(
      { id: id },
      { ...toUpdate }
    );

    if (!updatedProject) {
      throw new Error("Error Updating project");
    }

    return res
      .status(200)
      .json({ success: "Successfully updated the project", updatedProject });
  } catch (error) {
    console.error("Error occured: ", error);
    res.status(500).json({ error: "Error Updating Project" });
  }
};

const handleDeleteProject = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!id) {
      return res.status(500).json({ error: "Missing ID!" });
    }

    const deletedProject = await Projects.deleteOne({ id: id });
    console.log("Deleted project: ", deletedProject);

    if (!deletedProject) {
      throw new Error("Error deleting project");
    }

    return res
      .status(200)
      .json({ success: "Successfully deleted the project" });
  } catch (error) {
    console.error("Error Occured: ", error);
    res.status(500).json({ error: "Error deleting project" });
  }
};

module.exports = {
  handleProjectCreation,
  getProjects,
  getProjectData,
  handleUpdateProject,
  handleDeleteProject,
};
