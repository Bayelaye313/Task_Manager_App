import React from "react";
import { useUserContext } from "../../context/UserContext";

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();

  return (
    <div>
      <h1>Bienvenue, {user?.name || "Utilisateur"}</h1>
      <button onClick={logoutUser}>Se déconnecter</button>
    </div>
  );
};

export default Dashboard;
