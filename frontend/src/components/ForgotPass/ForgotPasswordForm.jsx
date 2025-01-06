import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const ForgotPasswordForm = () => {
  const { forgotPasswordEmail } = useUserContext();

  // state
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordEmail(email);

    // clear input
    setEmail("");
  };

  return (
    <form className="relative m-auto px-8 py-10 rounded-xl bg-gradient-to-r from-[#4e73df] to-[#2ECC71] w-full max-w-[480px] shadow-lg">
      <div className="relative z-10 text-center mb-8 text-white">
        <h1 className="text-2xl font-semibold">
          Enter email to reset password
        </h1>
      </div>

      <div className="mt-4 flex flex-col">
        <label htmlFor="email" className="text-white text-sm mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          name="email"
          placeholder="johndoe@gmail.com"
          className="px-4 py-3 rounded-md border border-[#3b3f5c] focus:outline-none focus:ring-2 focus:ring-[#FFE600] transition duration-200 ease-in text-gray-800"
        />
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

export default ForgotPasswordForm;
