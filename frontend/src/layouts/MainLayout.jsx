import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto">
      {/* {isEditing && <Modal />}
          {profileModal && <ProfileModal />} */}
      {children}
    </div>
  );
};

export default MainLayout;
