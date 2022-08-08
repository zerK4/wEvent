import React, { useState, useEffect } from "react";
import useAuthState from "../store/authStore";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const { submitLogout, logged, changeMode } = useAuthState();
  const [user, setUser] = useState();
  const [dark, setDark] = useState();
  useEffect(() => {
    setUser(logged);
    setDark(logged?.darkMode);
  }, [logged]);
  return (
    <div
      className={`h-[2.5rem] border-b-[1px] flex items-center w-[full] px-2 ${
        logged ? "border-neutral-700" : "border-neutral-400"
      }`}
    >
      <div className="lg:w-[62rem] w-full mx-auto flex items-center justify-end">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 items-center">
            {user?.profileImage?.asset?.url ? (
              <div className="h-[2rem] w-[2rem] rounded-full border-2 border-orange-400 ">
                <Image
                  src={user?.profileImage?.asset?.url}
                  height="100%"
                  width="100%"
                  layout="responsive"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="loader h-6 w-6"></div>
            )}
            <p>{user?.userName}</p>
          </div>
          <button
            onClick={submitLogout}
            className="hover:bg-neutral-300 ease-in-out duration-300 p-2 rounded-md"
          >
            <FiLogOut />
          </button>
          <div
            onClick={() => {
              changeMode(logged?._id, !dark);
            }}
            className={`w-[3rem] ${
              dark
                ? "bg-slate-600 after:absolute after:h-[1rem] after:w-[1rem] after:right-2 after:bg-slate-600 after:rounded-full"
                : "bg-neutral-300"
            } h-[1.5rem] rounded-xl border-2 ease-in-out duration-300 border-orange-400 relative flex  items-center px-1`}
          >
            <div
              className={`h-[1rem] ${
                dark ? "translate-x-5" : null
              } w-[1rem] bg-orange-400 movement rounded-full `}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
