import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const useRedirect = (redirect) => {
  const { userLoginStatus } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const isLoggedUser = await userLoginStatus();

        if (!isLoggedUser) {
          navigate(redirect);
        }
      } catch (error) {
        console.log("Error in redirecting User", error);
      }
    };

    redirectUser();
  }, [redirect, userLoginStatus, navigate]);
};

export default useRedirect;
