import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialiser `darkMode` depuis le localStorage ou par défaut à `false`
  const [darkMode, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true"; // Convertir en boolean
  });

  const toggleTheme = () => setDarkTheme((prev) => !prev);

  useEffect(() => {
    // Ajouter ou retirer la classe "dark" du body
    document.body.classList.toggle("dark", darkMode);

    // Enregistrer l'état actuel dans le localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
