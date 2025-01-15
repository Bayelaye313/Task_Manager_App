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

  const filteredTasks = filterTasks(tasks, priority);

  return (
    <main className="m-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
        <Filter />
      </div>
      <motion.div
        className="grid grid-cols-1 
                      md:grid-cols-2 
                      lg:grid-cols-3 
                      mt-10 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filteredTasks.map((task, i) => (
          <TaskItemsCard key={i} task={task} />
        ))}
        <motion.button
          className="h-[10rem] w-full py-4 rounded-lg text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400 hover:bg-gray-200 hover:border-gray-500 transition duration-200"
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
