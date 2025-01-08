import React from "react";

import { useEffect } from "react";
import TaskItemsCard from "./TaskItemsCard";
import Filter from "@/components/ui/utilities/Filter";
import { useTasks } from "@/context/TaskContext";
import { filteredTasks } from "../helpers/FilterTasks";
import { container, item } from "@/components/Dashboard/Dashboard";
import useRedirect from "@/helpers/useuserredirect";

export default function PendingTask() {
  useRedirect("/login");

  const { openModalForAdd, priority, tasks, setPriority } = useTasks();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const filtred = filteredTasks(pendingTasks, priority);
  console.log("overdue", filtred);
  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Completed Tasks</h1>
        <Filter />
      </div>

      <div
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
      </div>
    </main>
  );
}
