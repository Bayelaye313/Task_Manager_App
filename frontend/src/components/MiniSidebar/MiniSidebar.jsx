"use client";

import React from "react";

function MiniSidebar() {
  const pathname = window.location.pathname; // Utilisation de `window.location` pour remplacer `usePathname`

  // Détermine la couleur du trait en fonction de la route actuelle
  const getStrokeColor = (link) => (pathname === link ? "#3aafae" : "#71717a");

  // Navigation items
  const navItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={getStrokeColor("/")}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
          />
        </svg>
      ),
      title: "All",
      link: "/",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={getStrokeColor("/completed")}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      title: "Completed",
      link: "/completed",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={getStrokeColor("/pending")}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16l4-4 4 4m0-8l-4 4-4-4"
          />
        </svg>
      ),
      title: "Pending",
      link: "/pending",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={getStrokeColor("/overdue")}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6l4 2m0-10H8m16 6c0 8.837-7.163 16-16 16S0 20.837 0 12 7.163 0 16 0s16 7.163 16 16z"
          />
        </svg>
      ),
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-[5rem]">
        <div className="w-7 h-7 bg-gray-500 rounded-full" />{" "}
        {/* Logo Placeholder */}
      </div>

      {/* Navigation Section */}
      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <a href={item.link}>{item.icon}</a>
              {/* Tooltip */}
              <span className="absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        {/* Delete All Button */}
        <div className="mb-[1.5rem]">
          <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#EB4E31"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
