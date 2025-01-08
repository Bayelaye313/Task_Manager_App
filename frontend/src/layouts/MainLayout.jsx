import ModalForm from "@/components/ui/utilities/ModalsForm";
import { useTasks } from "@/context/TaskContext";
import React from "react";

const MainLayout = ({ children }) => {
  const { isEditing } = useTasks();
  return (
    <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto">
      {isEditing && <ModalForm />}
      {/* {profileModal && <ProfileModal />} */}
      {children}
    </div>
  );
};

export default MainLayout;
