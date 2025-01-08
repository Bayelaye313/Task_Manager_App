import { useEffect } from "react";

function useTrackOutside(ref, callback) {
  useEffect(() => {
    // Handler pour détecter les clics en dehors du ref
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Ajouter l'écouteur d'événement
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyage
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useTrackOutside;
