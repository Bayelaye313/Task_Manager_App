const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createTask,
  deleteTask,
  updateTask,
  getTask,
  getTasks,
} = require("../controllers/tasksControllers");

const router = express.Router();

router.post("/task/create", protect, createTask);
router.get("/tasks", protect, getTasks);
router.get("/task/:id", protect, getTask);
router.patch("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

module.exports = router;
