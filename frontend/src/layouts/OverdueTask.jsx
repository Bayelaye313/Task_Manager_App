import React from "react";
import moment from "moment/moment";

import { useEffect } from "react";
import TaskItemsCard from "./TaskItemsCard";
import Filter from "@/components/ui/utilities/Filter";
import { useTasks } from "@/context/TaskContext";
import { filteredTasks } from "../helpers/FilterTasks";
import { container, item } from "@/components/Dashboard/Dashboard";
import useRedirect from "@/helpers/useuserredirect";
import { motion } from "motion/react";

export const overdueTasks = (tasks) => {
  const todayDate = moment();

  // filter tasks that are not completed and the due date is before today
  return tasks.filter((task) => {
    return !task.completed && moment(task.dueDate).isBefore(todayDate);
  });
};

export default function OverdueTask() {
  useRedirect("/login");

  const { openModalForAdd, priority, tasks, setPriority } = useTasks();

  const overdue = overdueTasks(tasks);
  const filtred = filteredTasks(overdue, priority);
  console.log("filtredOverdue", filtred);
  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overdue Tasks</h1>
        <Filter />
      </div>

      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtred.map((task, i) => (
          <TaskItemsCard key={i} task={task} />
        ))}
        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </button>
      </motion.div>
    </main>
  );
}
