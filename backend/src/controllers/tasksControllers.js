const asyncHandler = require("express-async-handler");
const TaskModel = require("../../src/models/tasksModels");

// Utility function for error responses
const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

// Create a new task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  if (!title?.trim()) return sendErrorResponse(res, 400, "Title is required!");
  if (!description?.trim())
    return sendErrorResponse(res, 400, "Description is required!");

  const task = new TaskModel({
    title,
    description,
    dueDate,
    priority,
    status,
    user: req.user._id,
  });

  await task.save();
  res.status(201).json(task);
});

// Get all tasks for the authenticated user
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.find({ user: req.user._id });
  res.status(200).json({ length: tasks.length, tasks });
});

// Get a single task by ID
const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return sendErrorResponse(res, 400, "Task ID is required");

  const task = await TaskModel.findById(id);
  if (!task) return sendErrorResponse(res, 404, "Task not found");

  if (!task.user.equals(req.user._id))
    return sendErrorResponse(res, 401, "Not authorized");

  res.status(200).json(task);
});

// Update a task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status, completed } = req.body;

  if (!id) return sendErrorResponse(res, 400, "Task ID is required");

  const task = await TaskModel.findById(id);
  if (!task) return sendErrorResponse(res, 404, "Task not found");

  if (!task.user.equals(req.user._id))
    return sendErrorResponse(res, 401, "Not authorized");

  // Update fields
  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.dueDate = dueDate ?? task.dueDate;
  task.priority = priority ?? task.priority;
  task.status = status ?? task.status;
  task.completed = completed ?? task.completed;

  await task.save();
  res.status(200).json(task);
});

// Delete a task by ID
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);

  if (!task) return sendErrorResponse(res, 404, "Task not found");

  if (!task.user.equals(req.user._id))
    return sendErrorResponse(res, 401, "Not authorized");

  await task.deleteOne();
  res.status(200).json({ message: "Task deleted successfully" });
});

// Delete all tasks for the authenticated user
const deleteAllTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.find({ user: req.user._id });

  if (!tasks || tasks.length === 0)
    return sendErrorResponse(res, 404, "No tasks found");

  await TaskModel.deleteMany({ user: req.user._id });
  res.status(200).json({ message: "All tasks deleted successfully" });
});

module.exports = {
  deleteAllTasks,
  deleteTask,
  updateTask,
  getTask,
  getTasks,
  createTask,
};
