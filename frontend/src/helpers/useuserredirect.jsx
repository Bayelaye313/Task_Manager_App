import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const useRedirect = (redirect) => {
  const { user, loading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        if (!loading && (!user || !user.email)) {
          navigate(redirect);
        }
      } catch (error) {
        console.log("Error in redirecting User", error);
      }
    };

    redirectUser();
  }, [redirect, user, navigate]);
};

export default useRedirect;
