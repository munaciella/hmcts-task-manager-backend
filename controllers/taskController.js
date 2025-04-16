const taskModel = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = await taskModel.createTask({ title, description, due_date });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.getTaskById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await taskModel.updateTaskStatus(id, status);
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await taskModel.deleteTask(id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
