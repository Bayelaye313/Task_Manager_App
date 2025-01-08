import React from "react";
// import { motion } from "framer-motion";
import { useTasks } from "@/context/TaskContext";
import { Star, Edit, Trash } from "lucide-react";
import FormateDate from "@/helpers/FormateDate";

function TaskItemsCard({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();

  return (
    <div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={i}
    >
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{FormateDate(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              <Star />
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              <Edit />
            </button>
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItemsCard;
