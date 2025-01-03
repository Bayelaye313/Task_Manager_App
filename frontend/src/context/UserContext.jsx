import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Créer le contexte utilisateur
const UserContext = React.createContext();

// Configurer axios
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:5001";

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  //register user

  // login the user
  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       `${serverUrl}/api/v1/login`,
  //       {
  //         email: userState.email,
  //         password: userState.password,
  //       },
  //       {
  //         withCredentials: true, // send cookies to the server
  //       }
  //     );

  //     toast.success("User logged in successfully");

  //     // clear the form
  //     setUserState({
  //       email: "",
  //       password: "",
  //     });

  //     // refresh the user details
  //     await getUser(); // fetch before redirecting

  //     // push user to the dashboard page
  //     router.push("/");
  //   } catch (error) {
  //     console.log("Error logging in user", error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  // logout user
  // const logoutUser = async () => {
  //   try {
  //     const res = await axios.get(`${serverUrl}/api/v1/logout`, {
  //       withCredentials: true, // send cookies to the server
  //     });

  //     toast.success("User logged out successfully");

  //     // redirect to login page
  //     router.push("/login");
  //   } catch (error) {
  //     console.log("Error logging out user", error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  return (
    <UserContext.Provider value={{ userState, user }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUserContext = () => {
  return useContext(UserContext);
};
