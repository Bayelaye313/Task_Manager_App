"use client";
import { useTasks } from "@/context/TaskContext";
import useTrackOutside from "@/helpers/useTrackOutside";
import React, { useEffect, useRef } from "react";

function ModalForm() {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTasks();
  const ref = useRef(null);

  useTrackOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask);
    } else if (modalMode === "add") {
      handleInput("setTask")({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        completed: false,
      });
    }
  }, [modalMode, activeTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };

  return (
    <div className="fixed py-6 bottom-0 left-0 top-[0] z-50 w-full  bg-[#333]/30 flex justify-center items-center">
      <form
        className="py-[1.5rem] px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref}
      >
        {" "}
        <div className="flex flex-col gap-1">
          <label htmlFor="title">
            Title <b className="text-red-600">*</b>
          </label>
          <input
            className="bg-[#F9F9F9] p-1 rounded-md border"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task.title || ""}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">
            Description <b className="text-red-600">*</b>
          </label>
          <textarea
            className="bg-[#F9F9F9] p-1 rounded-md border resize-none"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task.description || ""}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <select
            className="bg-[#F9F9F9] p-1 rounded-md border cursor-pointer"
            name="priority"
            value={task.priority || "low"}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            className="bg-[#F9F9F9] p-1 rounded-md border"
            type="date"
            name="dueDate"
            value={task.dueDate || ""}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <div className="flex items-center justify-between bg-[#F9F9F9] p-1 rounded-md border">
            <label htmlFor="completed">Completed</label>
            <div>
              <select
                className="bg-[#F9F9F9] p-1 rounded-md border cursor-pointer"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className={`text-white py-1 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ModalForm;
