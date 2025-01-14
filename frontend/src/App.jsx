import React from "react";
import { Outlet } from "react-router-dom";
import MiniSidebar from "./components/MiniSidebar/MiniSidebar";
import Header from "./components/Header/Header";
import MainLayout from "./layouts/MainLayout";
import MainContentLayout from "./layouts/MainContentLayout";
import SidebarPovider from "./helpers/SidebarPovider";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { darkMode } = useTheme();
  return (
    <div className={`h-dvh flex overflow-hidden ${darkMode ? "dark" : ""}`}>
      {/* Barre latérale minimisée */}
      <MiniSidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* En-tête */}
        <Header />

        {/* Disposition principale */}
        <MainContentLayout>
          {/* Utilisation d'Outlet pour rendre les composants enfants */}
          <MainLayout>
            <Outlet />
          </MainLayout>

          {/* Fournisseur de contexte ou section supplémentaire */}
          <SidebarPovider />
        </MainContentLayout>
      </div>
    </div>
  );
}

export default App;
