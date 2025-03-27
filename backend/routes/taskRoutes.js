import express from "express";
import Task  from '../models/taskModel.js'
import { authGuard } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
const router = express.Router();


router.post('/create', authGuard ,async (req, res) => {
  try {
    const { title, description, dueDate, priority} = req.body;
 
    const task = new Task({ title, description, dueDate, priority, assignedTo:req.user });
    await task.save();
    const user = await User.findById(req.user);
    user.tasks.push(task._id);
    await user.save();
    res.status(200).json({task});
  } catch (err) {
    res.status(500).send('Error creating task');
  }
});


router.post('/list', authGuard,async (req, res) => {
  const page = req.body.pagenation || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
  
    const tasks = await Task.find({assignedTo: req.user} ).skip(skip).limit(8).populate('assignedTo');
    
    res.status(200).json({tasks});
   

  } catch (err) {
    res.status(500).send('Error fetching tasks');
  }
});
router.post('/list/:priority', authGuard,async (req, res) => {
  const page = req.body.pagenation || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
    
    const tasks = await Task.find({ assignedTo: req.user }).where("priority",req.params.priority).populate('assignedTo').skip(skip).limit(8);
    
    
    res.status(200).json({tasks});
   

  } catch (err) {
    res.status(500).send('Error fetching tasks');
  }
});


router.get('/taskdata/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo');
 

    res.status(201).json({ task });
  } catch (err) {
    res.status(500).send('Error fetching task details');
  }
});


router.post('/update/:id', async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
   const task= await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, priority, status });
   await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).send('Error updating task');
  }
});


router.get('/delete/:id', async (req, res) => {
  try {
   const task= await Task.findByIdAndDelete(req.params.id);
     await   User.updateOne(
          { _id: task.assignedTo }, 
          { $pull: { tasks: req.params.id } } 
        )
    res.status(200);
  } catch (err) {
    res.status(500).send('Error deleting task');
  }
});

export default router;
