import React, { useEffect, useState } from "react";
import useRedirect from "../../helpers/useuserredirect";
import Filter from "../ui/utilities/Filter";
import { useTasks } from "@/context/TaskContext";

const Dashboard = () => {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority } = useTasks();
  useEffect(() => {
    setPriority("all");
  }, []);
  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overdue Tasks</h1>
        <Filter />
      </div>
    </main>
  );
};

export default Dashboard;
