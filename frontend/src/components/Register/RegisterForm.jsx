import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const { registerUser, handleInputChange, userState } = useUserContext();
  const { email, name, password } = userState;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative m-auto px-8 py-10 rounded-xl bg-gradient-to-r from-[#4e73df] to-[#2ECC71] w-full max-w-[480px] shadow-lg">
      <div className="text-center mb-8 text-white">
        <h1 className="text-2xl font-semibold">Register for an Account</h1>
        <p className="mt-2 text-sm opacity-80">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-[#FFE600] hover:text-[#FF5733] transition-all duration-300"
          >
            Login here
          </a>
        </p>
      </div>

      <div className="mt-4 flex flex-col">
        <label htmlFor="name" className="text-white text-sm mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleInputChange("name")(e)}
          name="name"
          className="px-4 py-3 rounded-md border border-[#3b3f5c] focus:outline-none focus:ring-2 focus:ring-[#FFE600] transition duration-200 ease-in text-gray-800"
          placeholder="John Doe"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <label htmlFor="email" className="text-white text-sm mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleInputChange("email")(e)}
          name="email"
          className="px-4 py-3 rounded-md border border-[#3b3f5c] focus:outline-none focus:ring-2 focus:ring-[#FFE600] transition duration-200 ease-in text-gray-800"
          placeholder="johndoe@gmail.com"
        />
      </div>

      <div className="relative mt-6 flex flex-col">
        <label htmlFor="password" className="text-white text-sm mb-2">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => handleInputChange("password")(e)}
          name="password"
          className="px-4 py-3 rounded-md border border-[#3b3f5c] focus:outline-none focus:ring-2 focus:ring-[#FFE600] transition duration-200 ease-in text-gray-800"
          placeholder="***************"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        disabled={!name || !email || !password}
        onClick={registerUser}
        className="mt-6 w-full py-3 bg-[#FFE600] text-gray-800 font-semibold rounded-md hover:bg-[#FF5733] transition-colors disabled:opacity-50"
      >
        Register Now
      </button>

      <img
        src="/flurry.png"
        alt=""
        className="absolute bottom-0 right-0 w-32 opacity-30"
      />
    </form>
  );
};

export default RegisterForm;
