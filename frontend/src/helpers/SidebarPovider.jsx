import React from "react";
import { useUserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar/Sidebar";

function SidebarProvider() {
  const { user } = useUserContext();
  const userId = user ? user._id : null;
  return <>{userId && <Sidebar />}</>;
}

export default SidebarProvider;
