import React, { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const { resetPassword } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!resetToken) {
      toast.error("Invalid or missing reset token!");
      return;
    }

    resetPassword(resetToken, password);
  };

  return (
    <main className="auth-page w-full h-full flex justify-center items-center">
      <form
        className="m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full"
        onSubmit={handleSubmit} // Attach submit event here
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Reset Your Password!
          </h1>
          <div className="relative mt-[1rem] flex flex-col">
            <label htmlFor="password" className="mb-1 text-[#999]">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              name="password"
              placeholder="*********"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
            <button
              className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative mt-[1rem] flex flex-col">
            <label htmlFor="confirm-password" className="mb-1 text-[#999]">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              id="confirm-password"
              name="confirmPassword"
              placeholder="*********"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
            <button
              className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
            >
              Reset Password
            </button>
          </div>
        </div>
        <img src="/flurry.png" alt="" />
      </form>
    </main>
  );
};

export default ResetPassword;
