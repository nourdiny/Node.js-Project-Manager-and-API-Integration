const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "WEB-DEVELOPMENT",
      "MOBILE-APP-DEVELOPMENT",
      "GAME-DEVELOPMENT",
      "DATA-SCIENCE-AND-MACHINE-LEARNING",
      "BLOCKCHAIN-DEVELOPMENT",
      "IOT-DEVELOPMENT",
      "E-COMMERCE-DEVELOPMENT"
    ],
    required: true,
  }, // You can specify the valid types here
  image: { type: String, required: true },
  description: { type: String, required: true },
  link_github: { type: String },
  created_at: { type: String },
  image_list: [
    {
      image: { type: String, required: true },
    },
  ],
  video: { type: String },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
