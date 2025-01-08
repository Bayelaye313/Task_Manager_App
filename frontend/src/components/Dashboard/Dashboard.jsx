import React, { useEffect } from "react";
import useRedirect from "../../helpers/useuserredirect";
import Filter from "../ui/utilities/Filter";
import { useTasks } from "@/context/TaskContext";
import TaskItemsCard from "@/layouts/TaskItemsCard";
import { filteredTasks as filterTasks } from "@/helpers/FilterTasks";
import { motion } from "motion/react";
export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Dashboard = () => {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority } = useTasks();

  useEffect(() => {
    setPriority("all");
  }, [setPriority]);

  const filteredTasks = filterTasks(tasks, priority); // Call the function with arguments

  return (
    <main className="m-6 h-full">
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
        {filteredTasks.map((task, i) => (
          <TaskItemsCard key={i} task={task} />
        ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
};

export default Dashboard;
