import ModalForm from "@/components/ui/utilities/ModalsForm";
import ProfileModal from "@/components/ui/utilities/ProfileModals";
import { useTasks } from "@/context/TaskContext";
import React from "react";

const MainLayout = ({ children }) => {
  const { isEditing, profileModal } = useTasks();
  return (
    <div className="main-layout mb-[1rem] pb-[2rem] flex-1 bg-[#cfc9c9] border-2 border-white rounded-[1.5rem] overflow-auto">
      {isEditing && <ModalForm />}
      {profileModal && <ProfileModal />}
      {children}
    </div>
  );
};

export default MainLayout;
