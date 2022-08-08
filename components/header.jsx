import React, { useState, useEffect } from "react";
import useAuthState from "../store/authStore";
import { FiLogOut } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import functionStore from "../store/functionStore";

export default function Header() {
  const { submitLogout, logged } = useAuthState();
  const { events } = functionStore();
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(logged);
  }, []);
  return (
    <div
      className={`h-[3rem] border-b-[1px] flex items-center bg-slate-100 w-[full] px-2 shadow-sm shadow-slate-500`}
    >
      <div className="lg:w-[50rem] w-full mx-auto flex items-center justify-end">
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
              <div className="flex items-center">
                <BiUserCircle className="text-4xl text-neutral-700" />
              </div>
            )}
            <p>{user?.userName}</p>
          </div>
          <button
            onClick={submitLogout}
            className="hover:bg-neutral-300 ease-in-out duration-300 p-2 rounded-md"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </div>
  );
}
