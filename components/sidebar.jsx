import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdGroups, MdPerson } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import Link from "next/link";
import useAuthState from "../store/authStore";
import functionStore from "../store/functionStore";
import Image from "next/image";

export default function Sidebar() {
  const { logged } = useAuthState();
  const { event, fetchEvent, guests, fetchGuests } = functionStore();
  const [currentEvent, setCurrent] = useState();
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    setCurrent(event);
    fetchGuests(currentEvent?._id);
    fetchEvent(logged?.wCode?._ref);
  }, [event, logged]);

  return (
    <div
      className={`md:w-[15rem] bg-slate-100 shadow-md shadow-black md:border-x-[1px] z-40 w-full flex justify-center md:inline fixed bottom-0 md:top-0 ease-in-out duration-300 md:min-h-screen p-2 border-x-2  `}
    >
      <div className="relative md:flex hidden text-2xl">wEvents</div>
      <div className={`md:pt-12 pt-4 ease-in-out duration-300`}>
        <div className="flex md:flex-col gap-2">
          <Link href="/">
            <div
              className={`link flex gap-2 items-center justify-center md:justify-start p-2 rounded-md hover:bg-slate-300 cursor-pointer ease-in-out duration-300`}
            >
              <AiFillHome className="text-3xl md:text-xl" />
              <span className={`${isOn ? "flex" : "hidden md:flex"} `}>
                Acasă
              </span>
            </div>
          </Link>
          <Link href={`/guests/guests`} as={`/guests/guests`}>
            <div
              className={`link flex gap-2 items-center justify-center md:justify-start p-2 rounded-md hover:bg-slate-300 cursor-pointer ease-in-out duration-300`}
            >
              <MdGroups className="text-3xl md:text-xl" />
              <span className={`${isOn ? "flex" : "hidden md:flex"} `}>
                Invitați
              </span>
            </div>
          </Link>
          <Link href="/contracts/contracts">
            <div
              className={`link flex gap-2 items-center justify-center md:justify-start p-2 rounded-md hover:bg-slate-300 cursor-pointer ease-in-out duration-300`}
            >
              <HiDocumentDuplicate className="text-3xl md:text-xl" />
              <span className={`${isOn ? "flex" : "hidden md:flex"} `}>
                Contracte
              </span>
            </div>
          </Link>
          <div
            className={`link flex gap-2 items-center justify-center md:justify-start p-2 rounded-md hover:bg-slate-300 cursor-pointer ease-in-out duration-300`}
          >
            <MdPerson className="text-3xl md:text-xl" />
            <span className={`${isOn ? "flex" : "hidden md:flex"} `}>
              Membri
            </span>
          </div>
        </div>
        <div className="mt-[20%] hidden md:flex flex-col items-center">
          <div className="border-b-2 border-orange-500 mb-2 text-center mt-4">
            Event info
          </div>
          {!currentEvent?.wName ? (
            <div className="loader w-6 h-6"></div>
          ) : (
            <div className="w-full flex flex-col items-center">
              {currentEvent?.image?.asset?.url ? (
                <div className="w-[11rem] h-[5rem] object-contain">
                  <Image
                    src={currentEvent?.image?.asset?.url}
                    height="100%"
                    width="100%"
                    layout="responsive"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="h-[5rem] flex items-center">
                  <div className="loader h-8 w-8"></div>
                </div>
              )}
              <div className="mt-20 font-bold">{currentEvent?.wName}</div>
              <div className="text-neutral-500">{currentEvent?.wDate}</div>
              <div className="text-neutral-500 flex items-center gap-2">
                <p>Invitati:</p>
                <span className="text-orange-400">{guests?.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
