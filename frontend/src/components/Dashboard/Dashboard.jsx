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
    <main className="py-[2rem] mx-[10rem]">
      <header className="flex justify-between">
        <h1 className="text-[2rem] font-bold">
          Welcome <span className="text-red-600">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="w-[40px] h-[40px] rounded-full"
          />
          {!isVerified && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={emailVerification}
            >
              Verify Account
            </button>
          )}

          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>

        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-[#2ECC71] text-white rounded-md"
          >
            Update Bio
          </button>
        </h1>

        {isOpen && (
          <form className="mt-4 px-8 py-4 max-w-[520px] w-full rounded-md">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#999]">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
                onChange={(e) => handleInputChange("bio")(e)}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4 px-4 py-2  bg-blue-500 text-white rounded-md"
            >
              Update Bio
            </button>
          </form>
        )}
      </section>
      <div className="mt-4 flex gap-8">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          {Array.isArray(allUsers) &&
            allUsers.map(
              (user, i) =>
                user.role !== "admin" && (
                  <li
                    key={i}
                    className="mb-2 px-2 py-3 border grid grid-cols-4 items-center gap-8 rounded-md"
                  >
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-[40px]  h-[40px] rounded-full"
                    />
                    <p>{user.name}</p>
                    <p>{user.bio}</p>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      Delete User
                    </button>
                  </li>
                )
            )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
