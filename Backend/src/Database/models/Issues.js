const mongoose = require("../config/mdb");
const { v4: uid } = require("uuid");

const issuesSchema = new mongoose.Schema({
  id: { type: String, default: () => uid() },
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Issues = mongoose.model("Issues", issuesSchema);

module.exports = Issues;
