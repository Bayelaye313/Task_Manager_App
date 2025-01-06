import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import useRedirect from "../../helpers/useuserredirect";
import ChangePasswordForm from "../changePassword/ChangePasswordForm";

const Dashboard = () => {
  useRedirect("/login");

  const {
    user,
    logoutUser,
    handleInputChange,
    userState,
    updateUser,
    deleteUser,
    emailVerification,
    allUsers,
  } = useUserContext();
  const { name, photo, bio, isVerified } = user;

  // state
  const [isOpen, setIsOpen] = useState(false);

  // function
  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="py-10 px-8 bg-gradient-to-r from-[#4e73df] to-[#2ECC71] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome <span className="text-yellow-400">{name}</span>
        </h1>
        <div className="flex items-center gap-6">
          <img
            src={photo}
            alt={name}
            className="w-[50px] h-[50px] rounded-full border-2 border-white"
          />
          {!isVerified && (
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors"
              onClick={emailVerification}
            >
              Verify Account
            </button>
          )}

          <button
            onClick={logoutUser}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="text-white mb-8">
        <p className="text-xl">{bio}</p>

        <div className="mt-6">
          <button
            onClick={myToggle}
            className="px-6 py-3 bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
          >
            Update Bio
          </button>
        </div>

        {isOpen && (
          <form
            className="mt-6 max-w-[600px] mx-auto p-6 rounded-lg bg-white text-gray-800"
            onSubmit={(e) => updateUser(e, { bio: userState.bio })}
          >
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-2 text-[#555] text-lg">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="px-4 py-3 border-2 rounded-md outline-none focus:ring-2 focus:ring-[#2ECC71] transition duration-200 ease-in"
                onChange={(e) => handleInputChange("bio")(e)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors"
            >
              Update Bio
            </button>
          </form>
        )}
      </section>

      <div className="flex gap-12">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          {Array.isArray(allUsers) &&
            allUsers.map(
              (user, i) =>
                user.role !== "admin" && (
                  <div
                    key={i}
                    className="mb-4 p-4 bg-white shadow-lg rounded-md grid grid-cols-4 gap-8 items-center"
                  >
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-[40px] h-[40px] rounded-full border-2 border-[#999]"
                    />
                    <div className="col-span-2">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.bio}</p>
                    </div>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete User
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
