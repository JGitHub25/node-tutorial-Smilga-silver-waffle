const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please provide a name`],
    trim: true,
    maxlength: [20, "The name must be under 20 characters."],
  },
  completed: { type: Boolean, default: false },
});
const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = { TaskModel };
