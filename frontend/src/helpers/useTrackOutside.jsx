import { useEffect } from "react";

function useTrackOutside({ ref, callback }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Vérifier si le clic est en dehors du ref
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); // Appeler la fonction de fermeture
      }
    };

    // Ajouter l'écouteur d'événements
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyer l'écouteur lors du démontage
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useTrackOutside;
