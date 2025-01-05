import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Créer le contexte utilisateur
const UserContext = React.createContext();

// Configurer axios
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:5001";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (name) => (e) => {
    setUserState((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!userState.email.includes("@") || userState.password.length < 6) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }
    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      toast.success("User registered successfully");
      setUserState({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/v1/login`, {
        email: userState.email,
        password: userState.password,
      });
      toast.success("User logged in successfully");
      setUserState({ email: "", password: "" });
      await getUser();
      navigate("/");
    } catch (error) {
      console.error("Error logging in user", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });
      setUser(null);
      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out user", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const userLoginStatus = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`);
      return !!res.data;
    } catch (error) {
      console.error("Error checking login status", error);
      return false;
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user details", error);
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = await userLoginStatus();
      if (isLoggedIn) await getUser();
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        userState,
        handleInputChange,
        registerUser,
        loginUser,
        logoutUser,
        userLoginStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUserContext = () => {
  return useContext(UserContext);
};
