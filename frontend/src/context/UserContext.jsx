import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Create UserContext
const UserContext = React.createContext();

// Axios configuration
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:5001";
  const navigate = useNavigate();

  const [user, setUser] = useState({ role: "", name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [allUsers, setAllUsers] = useState([]);

  // Handle form inputs
  const handleInputChange = (field) => (e) => {
    setUserState((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  // Error handling function
  const handleError = (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
  };

  // Register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (!userState.email.includes("@") || userState.password.length < 6) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }
    try {
      await axios.post(`${serverUrl}/api/v1/register`, userState);
      toast.success("User registered successfully");
      setUserState({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  };

  // Login user
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
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await axios.post(`${serverUrl}/api/v1/logout`);
      setUser(null);
      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  };

  // Get logged-in user
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`);
      setUser(res.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data);
      setUser((prevState) => ({ ...prevState, ...res.data }));
      toast.success("User updated successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Verify email
  const emailVerification = async () => {
    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/v1/verify-email`);
      toast.success("Email verification sent successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Verify user
  const verifyUser = async (token) => {
    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/v1/verify-user/${token}`);
      toast.success("User verified successfully");
      await getUser();
      navigate("/");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/v1/reset-password/${token}`, {
        password,
      });
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Admin routes
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/admin/users`);
      setAllUsers(res.data.users);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/v1/admin/users/${id}`);
      toast.success("User deleted successfully");
      await getAllUsers();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Check login status
  const userLoginStatus = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`);
      return !!res.data;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = await userLoginStatus();
      if (isLoggedIn) await getUser();
    })();
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      getAllUsers();
    }
  }, [user?.role]);

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
        updateUser,
        emailVerification,
        verifyUser,
        deleteUser,
        resetPassword,
        allUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => useContext(UserContext);
