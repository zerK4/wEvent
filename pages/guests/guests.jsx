import React, { useEffect, useState } from "react";
import useAuthState from "../../store/authStore";
import functionStore from "../../store/functionStore";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineSearch,
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { FcInvite, FcApproval, FcClock, FcCancel } from "react-icons/fc";
import Link from "next/link";

export const Guests = () => {
  const { event, fetchEvent, removeUser, getOne, fetchGuests, guests } =
    functionStore();
  const { logged } = useAuthState();
  const [currentEvent, setCurrent] = useState();
  const [currentGuests, setCurrentGuests] = useState();
  useEffect(() => {
    fetchGuests(logged?.wCode?._ref);
  }, []);
  useEffect(() => {
    setCurrentGuests(guests);
  }, [guests]);

  return (
    <div className="p-6 w-full lg:w-fit flex flex-col gap-2">
      <div className="h-[3rem] flex justify-between items-center">
        <div className="">Invitați</div>
        <div
          className={`
          flex gap-2 items-center`}
        >
          <AiOutlineSearch />
          <input
            type="text"
            className={`bg-transparent outline-none h-[2rem]`}
            placeholder="Cauta invitati"
          />
        </div>
        <Link href={`/guests/newGuest`}>
          <button
            className={`p-2 border-2 rounded-md bg-slate-300 hover:bg-slate-500
            ease-in-out duration-300 active:bg-green-400`}
          >
            <AiOutlinePlus className="" />
          </button>
        </Link>
      </div>
      <div className="lg:w-[40rem] w-full">
        <div className="border-b-2 border-neutral-500 flex h-[3rem] items-center justify-between">
          <p className="flex justify-center w-[3rem]">OK?</p>
          <p className="flex justify-center w-[3rem]">
            <FcInvite className="text-2xl" />
          </p>
          <p className="flex justify-center w-[10rem]">Nume</p>
          <p className="lg:flex justify-center hidden w-[10rem]">Locație</p>
          <p className="lg:flex justify-center hidden w-[10rem]">Telefon</p>
          <p className="flex justify-center w-[10rem]">Acțiuni</p>
        </div>
        {guests.length === 0 ? (
          <div className="w-full h-[10rem] flex items-center justify-center gap-4">
            <div className="loader w-5 h-5"></div>
            <div className="">Nu ai nici un invitat momentan.</div>
          </div>
        ) : (
          <div className="w-full">
            {currentGuests?.map((x, i) =>
              x.mName ? (
                <div
                  key={i}
                  className="h-[2.5rem] items-center text-center flex justify-between border-b-2 even:bg-neutral-100 hover:bg-neutral-100 ease-in-out duration-300"
                >
                  <div className={`flex justify-center p-1 w-[3rem]`}>
                    {x.confirmed ? (
                      <div>
                        <FcApproval className="text-3xl" />
                      </div>
                    ) : x.confirmed === false ? (
                      <div>
                        <FcCancel className="text-3xl" />
                      </div>
                    ) : (
                      <div className="">
                        <FcClock className="text-2xl" />
                      </div>
                    )}
                  </div>
                  <div className={`flex justify-center p-1 w-[3rem]`}>
                    {x.provided === true ? (
                      <div>
                        <FcApproval className="text-2xl" />
                      </div>
                    ) : (
                      <div>
                        <FcClock className="text-2xl" />
                      </div>
                    )}
                  </div>
                  <div className="w-[10rem]">{x.mName}</div>
                  <div className="w-[10rem] hidden lg:flex justify-center">
                    {x.location}
                  </div>
                  <div className="w-[10rem] hidden lg:flex justify-center">
                    {x.phone}
                  </div>

                  <div className="text-center w-[10rem]">
                    <div className="flex justify-center gap-2">
                      <div
                        onClick={() => removeUser(x._id)}
                        className="p-1 rounded-md bg-neutral-200 border-2 border-neutral-300 hover:bg-red-500 cursor-pointer ease-in-out duration-300"
                      >
                        <AiFillDelete className="text-xl" />
                      </div>

                      <div className="" onClick={(e) => getOne(x._id)}>
                        <Link href={`/guests/[id]`} as={`/guests/${x._id}`}>
                          <div className="p-1 rounded-md bg-neutral-200 border-2 border-neutral-300 hover:bg-green-500 cursor-pointer ease-in-out duration-300">
                            <AiFillEdit className="text-xl" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="loader w-5 h-5 my-1"></div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Guests;
