import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, Moon, User } from "lucide-react";
import { useUserContext } from "../../context/UserContext";

function Header() {
  const { user } = useUserContext();
  const activeTasks = 5; // Exemple de tâches actives
  const navigate = useNavigate();

  const openModalForAdd = () => {
    console.log("Ouvrir la modale pour ajouter une tâche");
  };

  const userId = user._id;
  const { name } = user;

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to Taskfyer"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">{activeTasks}</span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              navigate("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        <div className="flex gap-4 items-center">
          <Link
            to="https://github.com/Maclinz/taskfyer"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <Github className="text-purple-500" />
          </Link>
          <Link
            to="#"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <Moon className="text-purple-500" />
          </Link>
          <Link
            to="#"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <User className="text-purple-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
