const mongoose = require("../config/mdb"); 

const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true }, 
    username: { type: String, required: true }, 
    avatarUrl: { type: String }, 
    email: { type: String }, 
    role: { type: String, required: true, default: "user" }, 
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true }); 

const User = mongoose.model("User", userSchema);

module.exports = User;
