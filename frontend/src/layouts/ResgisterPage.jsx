import React, { useEffect } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const ResgisterPage = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  console.log("uer", user);
  useEffect(() => {
    // redirect to home page if user is already logged in
    if (user && user._id) {
      navigate("/");
    }
  }, [user, navigate]);

  // return null or a loading spinner/indicator
  if (user && user._id) {
    return null;
  }
  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default ResgisterPage;
