const mongoose = require("../config/mdb");
const { v4: uid } = require("uuid");

const projectSchema = new mongoose.Schema({
  id: { type: String, default: () => uid(), unique: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  ownerId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
