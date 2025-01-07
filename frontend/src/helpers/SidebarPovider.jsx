import React from "react";
import { useUserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar/Sidebar";

function SidebarProvider() {
  const userId = useUserContext().user._id;
  return <>{userId && <Sidebar />}</>;
}

export default SidebarProvider;
