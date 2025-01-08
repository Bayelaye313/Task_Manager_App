import React, { useRef, useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { useUserContext } from "@/context/UserContext";
import useTrackOutside from "@/helpers/useTrackOutside";
import { Badge, Check, Github, Mail } from "lucide-react";

function ProfileModal() {
  const ref = useRef(null);

  const { closeModal } = useTasks();
  const { user, updateUser, handleInputChange, userState, changePassword } =
    useUserContext();

  useTrackOutside({
    ref,
    callback: () => {
      closeModal();
    },
  });

  const { name, email, photo } = user;

  //state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePassword = (type) => (e) => {
    if (type === "old") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <div
        ref={ref}
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md border-2 border-white"
      >
        <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md"></div>

        <div className="mt-4 relative flex justify-between">
          <div className="relative inline-block">
            <img
              src={photo}
              alt="profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-1 shadow-sm">
              <span className="text-lg text-blue-400">
                <Badge />
              </span>
              <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                <Check />
              </span>
            </div>
          </div>
          <div className="self-end flex items-center gap-2">
            <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
              <Github /> Github
            </button>
            <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
              <Check /> Verified
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-sm text-gray-500">
            <Mail />
          </p>
        </div>

        <form
          action=""
          className="mt-4 pt-2 flex flex-col gap-4 border-t-2 border-t-[#323232]/10"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(e, {
              name: userState.name,
              email: userState.email,
            });
          }}
        >
          <div className="pt-2 grid grid-cols-[150px_1fr]">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              onChange={(e) => handleInputChange("name")(e)}
              className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
            />
          </div>

          <div className="pt-4 grid grid-cols-[150px_1fr] border-t-2 border-t-[#323232]/10">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => handleInputChange("email")(e)}
                className="w-full py-[0.4rem] pl-9 pr-2 font-medium rounded-lg border-2 border-[#323232]/10"
              />
              <span className="absolute left-0 top-0 bottom-0 flex items-center px-3 text-[#323232]/50">
                <Mail />
              </span>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t-2 border-t-[#323232]/10">
            <div className="flex flex-col gap-1">
              <label htmlFor="oldPassWord" className="text-sm font-medium">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={handlePassword("old")}
                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePassword("new")}
                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="py-3 px-4 bg-blue-500 text-white text-sm font-medium rounded-md
                hover:bg-blue-400 transition-all duration-300"
              onClick={() => changePassword(oldPassword, newPassword)}
            >
              Change Password
            </button>
          </div>

          <div className="flex justify-end gap-4 border-t-2 border-t-[#323232]/10">
            <button
              className="mt-3 py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-3 py-2 px-4 bg-[#3aafae] text-white text-sm font-medium rounded-md
                hover:bg-[#2e8d8c]/90 transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
