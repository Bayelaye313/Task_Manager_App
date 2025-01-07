import React from "react";
import { useUserContext } from "../../context/UserContext";
import UserProfile from "../profil/UserProfil";
import RadialCHart from "../ui/utilities/RadialChart";

function Sidebar() {
  const { logoutUser } = useUserContext();
  return (
    <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-[#f9f9f9] flex flex-col">
      <UserProfile />
      <div className="mt-4 mx-6">
        <RadialCHart />
      </div>

      <button
        className="mt-auto mb-6 mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
        onClick={logoutUser}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Sidebar;
