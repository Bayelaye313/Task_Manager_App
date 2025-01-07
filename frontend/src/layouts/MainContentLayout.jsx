import React from "react";
import { useUserContext } from "../context/UserContext";

const MainContentLayout = ({ children }) => {
  const { user } = useUserContext();
  const userId = user ? user._id : null;

  return (
    <main
      className={`${
        userId ? "pr-[20rem]" : ""
      } pb-[1.5rem] flex h-full bg-gray-100`}
    >
      {children}
    </main>
  );
};

export default MainContentLayout;
