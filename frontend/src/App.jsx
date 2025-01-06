import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Ajoutez ici des composants globaux comme Header, Sidebar, Footer */}
      <header>
        <h1>Mon Application</h1>
      </header>
      <main>
        {/* Rendu des composants enfants */}
        <Outlet />
      </main>
      <footer>
        <p>© 2025 Mon Application</p>
      </footer>
    </div>
  );
}

export default App;
