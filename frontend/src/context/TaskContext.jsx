import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "./UserContext";

const TasksContext = createContext();

const serverUrl = "https://task-manager-app-ba2d.onrender.com/api/v1";

export const TasksProvider = ({ children }) => {
  const { user } = useUserContext();
  const userId = user ? user._id : null;

  //   console.log("usid", userId);
  const defaultTask = {
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false,
  };

  const [task, setTask] = useState(defaultTask);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState("all");
  const [activeTask, setActiveTask] = useState(null);
  const [modalMode, setModalMode] = useState("");
  const [profileModal, setProfileModal] = useState(false);

  //Modals functions

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  //CRUD functions
  const createTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task);
      setTasks([...tasks, res.data]);
      toast.success("Task created successfully", {
        icon: "🎉",
        style: { borderRadius: "8px", background: "#333", color: "#fff" },
      });
    } catch (error) {
      toast.error(
        "Failed to create task: " + error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };
  //delete task
  const deleteTask = async (taskId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this task? This action cannot be undone."
      )
    ) {
      setLoading(true);
      try {
        await axios.delete(`${serverUrl}/task/${taskId}`);
        toast.success("task deleted successfully");

        // remove the task from the tasks array
        const newTasks = tasks.filter((tsk) => tsk._id !== taskId);

        setTasks(newTasks);
      } catch (error) {
        toast.error(
          "Failed to delete all tasks: " + error.response?.data?.message ||
            error.message
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // get tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);
      console.log("retas", response);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
    setLoading(false);
  };

  // get task
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);

      setTask(response.data);
    } catch (error) {
      console.log("Error getting task", error);
    }
    setLoading(false);
  };

  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);

      // update the task in the tasks array
      const newTasks = tasks.map((tsk) => {
        return tsk._id === res.data._id ? res.data : tsk;
      });

      toast.success("Task updated successfully");

      setTasks(newTasks);
    } catch (error) {
      console.log("Error updating task", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  // get completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  // get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    if (userId) {
      getTasks();
    }
  }, [userId]);

  // console.log("Active tasks", activeTasks);

  return (
    <TasksContext.Provider
      value={{
        activeTask,
        activeTasks,
        createTask,
        completedTasks,
        closeModal,
        deleteTask,
        getTask,
        handleInput,
        isEditing,
        loading,
        modalMode,
        openModalForAdd,
        openModalForEdit,
        openProfileModal,
        profileModal,
        priority,
        setPriority,
        setIsEditing,
        tasks,
        task,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
