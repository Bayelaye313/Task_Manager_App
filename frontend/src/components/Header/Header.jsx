import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, Moon, Sun, User } from "lucide-react";
import { useUserContext } from "../../context/UserContext";
import { useTasks } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";

function Header() {
  const { user } = useUserContext();
  const { darkMode, toggleTheme } = useTheme();
  const { openModalForAdd, activeTasks = [] } = useTasks();
  const navigate = useNavigate();

  const { _id: userId, name = "Guest" } = user || {};

  return (
    <header
      className={`px-6 my-4 flex items-center justify-between bg-transparent transition-all duration-300 ${
        userId ? "w-[calc(100%-20rem)] ml-0" : "w-full"
      }`}
    >
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to our Modern TaskManager"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-teal-600">
                {activeTasks.length}
              </span>{" "}
              active tasks.
            </>
          ) : (
            "Please login or register to view your tasks."
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-8">
        <button
          className="px-8 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
          onClick={() => (userId ? openModalForAdd() : navigate("/login"))}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>
        <div className="flex gap-4 items-center">
          {userId ? (
            // Afficher uniquement le bouton Toggle si l'utilisateur est connecté
            <button
              aria-label="Toggle Dark Mode"
              onClick={toggleTheme}
              className="h-10 w-10 flex items-center justify-center text-purple-500 border-2 border-gray-300 rounded-full"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
          ) : (
            // Afficher toutes les icônes si l'utilisateur n'est pas connecté
            <>
              <a
                href="https://github.com/Bayelaye313/Task_Manager_App"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center text-purple-500 border-2 border-gray-300 rounded-full"
              >
                <Github />
              </a>
              <button
                aria-label="Toggle Dark Mode"
                onClick={toggleTheme}
                className="h-10 w-10 flex items-center justify-center text-purple-500 border-2 border-gray-300 rounded-full"
              >
                {darkMode ? <Sun /> : <Moon />}
              </button>
              <button
                aria-label="User Settings"
                className="h-10 w-10 flex items-center justify-center text-purple-500 border-2 border-gray-300 rounded-full"
              >
                <User />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
