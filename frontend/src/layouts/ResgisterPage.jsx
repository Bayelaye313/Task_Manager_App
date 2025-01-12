import React, { useEffect } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const ResgisterPage = () => {
  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default ResgisterPage;
