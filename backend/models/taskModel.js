import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Task = mongoose.model("Task", taskSchema);
// module.exports = mongoose.model('Task', taskSchema);
export default Task;