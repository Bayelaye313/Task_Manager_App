import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordForm = () => {
  const { changePassword } = useUserContext();

  // state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const currentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(currentPassword, newPassword);

    // clear input
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <form className="relative m-auto px-8 py-10 rounded-xl bg-gradient-to-r from-[#4e73df] to-[#2ECC71] w-full max-w-[480px] shadow-lg">
      <div className="relative z-10 text-center mb-8 text-white">
        <h1 className="text-2xl font-semibold">Reset Your Password!</h1>
      </div>

      <div className="mt-4 flex flex-col">
        <label htmlFor="currentPassword" className="text-white text-sm mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={currentPasswordChange}
            id="currentPassword"
            name="currentPassword"
            placeholder="*********"
            className="px-4 py-3 rounded-md border border-[#3b3f5c] focus:outline-none focus:ring-2 focus:ring-[#FFE600] transition duration-200 ease-in text-gray-800"
          />
          <button
            className="absolute p-1 right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={togglePassword}
            type="button"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        <label htmlFor="newPassword" className="text-white text-sm mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={newPasswordChange}
            id="newPassword"
            name="newPassword"
            placeholder="*********"
            className="px-4 py-3 rounded-md border border-[#3b3f5c] focus:outline-none focus:ring-2 focus:ring-[#FFE600] transition duration-200 ease-in text-gray-800"
          />
          <button
            className="absolute p-1 right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={togglePassword}
            type="button"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 bg-[#FFE600] text-gray-800 font-semibold rounded-md hover:bg-[#FF5733] transition-colors disabled:opacity-50"
        >
          Reset Password
        </button>
      </div>

      <img
        src="/flurry.png"
        alt=""
        className="absolute bottom-0 right-0 w-32 opacity-30"
      />
    </form>
  );
};

export default ChangePasswordForm;
