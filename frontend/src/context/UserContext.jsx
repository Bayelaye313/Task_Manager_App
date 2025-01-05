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

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  //register user

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login page
      navigate("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };
  // handle input change
  const handleInputChange = (name) => (e) => {
    const value = e.target.value;

    setUserState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // login the user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User logged in successfully");

      // clear the form
      setUserState({
        email: "",
        password: "",
      });

      // refresh the user details
      // await getUser(); // fetch before redirecting

      // push user to the dashboard page
      navigate("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  // logout user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });

      toast.success("User logged out successfully");

      // redirect to login page
      navigate("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user Looged in Status
  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
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

      if (isLoggedIn) {
        // await getUser();
      }
    };

    loginStatusGetUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        handleInputChange,
        loginUser,
        logoutUser,
        userState,
        user,
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
