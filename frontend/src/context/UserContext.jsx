import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Create UserContext
const UserContext = React.createContext();

// Axios configuration
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "https://task-manager-app-ba2d.onrender.com/api/v1";
  const navigate = useNavigate();

  const [user, setUser] = useState({});
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
      await axios.post(`${serverUrl}/register`, userState);
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
      await axios.post(`${serverUrl}/login`, {
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

  const logoutUser = async () => {
    try {
      await axios.post(`${serverUrl}/logout`);

      // Supprimer le token du stockage local
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Supprimer les informations utilisateur et rediriger
      setUser({});
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
      const res = await axios.get(`${serverUrl}/user`);
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
      const res = await axios.patch(`${serverUrl}/user`, data);
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
      await axios.post(`${serverUrl}/verify-email`);
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
      await axios.post(`${serverUrl}/verify-user/${token}`);
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
      await axios.post(`${serverUrl}/reset-password/${token}`, {
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
      const res = await axios.get(`${serverUrl}/admin/users`);
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
      await axios.delete(`${serverUrl}/admin/users/${id}`);
      toast.success("User deleted successfully");
      await getAllUsers();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  // forgot password email
  const forgotPasswordEmail = async (email) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/forgot-password`,
        {
          email,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Forgot password email sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error sending forgot password email", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);

    try {
      const res = await axios.patch(
        `${serverUrl}/change-password`,
        { currentPassword, newPassword },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Password changed successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // Check login status
  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/login-status`, {
        withCredentials: true, // send cookies to the server
      });

      // coerce the string to boolean
      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();
      // console.log("logstat", isLoggedIn);

      if (isLoggedIn) {
        await getUser();
      }
    };

    loginStatusGetUser();
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
        changePassword,
        forgotPasswordEmail,

        allUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => useContext(UserContext);
