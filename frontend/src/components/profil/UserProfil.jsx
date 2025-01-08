import React from "react";
import { Image as LucideImage, CheckCircle, Loader } from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { useUserContext } from "@/context/UserContext";

function UserProfile() {
  const { user } = useUserContext();
  const { tasks, activeTasks, completedTasks, openProfileModal } = useTasks();

  return (
    <div className="m-6">
      {/* Profile Card */}
      <div
        className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
        onClick={openProfileModal}
      >
        <div className="w-[70px] h-[70px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="avatar"
              className="rounded-full object-cover w-full h-full"
            />
          ) : (
            <LucideImage className="text-gray-500" size={40} />
          )}
        </div>
        <div>
          <h1 className="flex flex-col text-xl">
            <span className="font-medium">Hello,</span>
            <span className="font-bold">{user?.name || "Guest"}</span>
          </h1>
        </div>
      </div>

      {/* Task Stats */}
      <div className="mt-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-400">
            <p>Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {tasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>In Progress:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Open Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {completedTasks.length}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <h3 className="mt-8 font-medium">Activity</h3>
    </div>
  );
}

export default UserProfile;
