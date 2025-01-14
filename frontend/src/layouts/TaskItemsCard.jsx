import React from "react";
// import { motion } from "framer-motion";
import { useTasks } from "@/context/TaskContext";
import { Star, Edit, Trash } from "lucide-react";
import FormateDate from "@/helpers/FormateDate";
import { item } from "@/components/Dashboard/Dashboard";
import { motion } from "motion/react";

function TaskItemsCard({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "high":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const { getTask, openModalForEdit, deleteTask } = useTasks();

  return (
    <motion.div
      className="h-[10rem] px-4 py-4 flex flex-col gap-4 shadow-lg bg-white rounded-lg border hover:shadow-md transition-shadow duration-200"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-lg text-gray-800 truncate">
          {task.title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-xs text-gray-400">{FormateDate(task.createdAt)}</p>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-md ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <div className="flex items-center gap-2">
          <button
            className={`p-1 rounded-full ${
              task.completed ? "text-yellow-400" : "text-gray-400"
            } hover:bg-gray-100`}
          >
            <Star size={20} />
          </button>
          <button
            className="p-1 rounded-full text-blue-500 hover:bg-gray-100"
            onClick={() => {
              getTask(task._id);
              openModalForEdit(task);
            }}
          >
            <Edit size={20} />
          </button>
          <button
            className="p-1 rounded-full text-red-500 hover:bg-gray-100"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default TaskItemsCard;
