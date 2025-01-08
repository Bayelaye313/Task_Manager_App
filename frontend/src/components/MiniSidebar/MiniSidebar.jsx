"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid, CheckCircle, ArrowUpDown, Clock, X } from "lucide-react";

function MiniSidebar() {
  const pathname = useLocation().pathname;
  const getStrokeColor = (link) => (pathname === link ? "#3aafae" : "#71717a");

  const navItems = [
    {
      icon: <Grid color={getStrokeColor("/")} size={24} />,
      title: "All",
      link: "/",
    },
    {
      icon: <CheckCircle color={getStrokeColor("/completed")} size={24} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <ArrowUpDown color={getStrokeColor("/pending")} size={24} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <Clock color={getStrokeColor("/overdue")} size={24} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
      <div className="flex items-center justify-center h-[5rem]">
        <img
          src="/saitama.jpg"
          className="rounded-full"
          width={28}
          height={28}
          alt="logo"
        />{" "}
      </div>
      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link to={item.link}>{item.icon}</Link>
              <span className="absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
        <div className="mb-[1.5rem]">
          <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] p-2 rounded-full">
            <X color="#EB4E31" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
