import React from "react";
import { useUserContext } from "../../context/UserContext";
import UserProfile from "../profil/UserProfil";
import RadialChart from "../ui/utilities/RadialChart";

function Sidebar() {
  const { logoutUser } = useUserContext();

  return (
    <div
      className="w-[20rem] fixed top-0 right-0 h-auto bg-transparent flex flex-col 
                 border-l border-gray-200 shadow-md p-4 overflow-y-auto"
      style={{ maxHeight: "100vh" }} // Limite la hauteur pour s'adapter à l'écran
    >
      {/* Profil de l'utilisateur */}
      <UserProfile />

      {/* Graphique radial */}
      <div className="mt-4 mb-4">
        <RadialChart />
      </div>

      {/* Bouton de déconnexion */}
      <button
        className="mt-auto py-3 px-6 bg-[#EB4E31] text-white rounded-lg 
                   hover:bg-[#3aafae] transition-all duration-200"
        onClick={logoutUser}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Sidebar;
