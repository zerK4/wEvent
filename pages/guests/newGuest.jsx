import React, { useState, useEffect } from "react";
import functionStore from "../../store/functionStore";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
} from "react-icons/ai";

export default function NewGuest() {
  const { addUser, event, guests } = functionStore();
  const [currentEvent, setCurrent] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState(undefined);
  const [provided, setProvided] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setCurrent(event);
    setIsLoading(false);
    setTimeout(() => setSuccess(false), 2000);
  }, [event, guests]);

  const addFun = (e) => {
    e.preventDefault();
    if ((name, phone, location)) {
      setIsLoading(true);
      setErrorMsg(false);
      addUser(currentEvent._id, name, location, phone, confirmation, provided);
      setTimeout(() => setSuccess(true), 1000);
      setName("");
      setPhone("");
      setLocation("");
      setConfirmation(undefined);
    } else {
      setErrorMsg(true);
    }
  };

  return (
    <div className="p-4 xl:ml-10 w-full flex flex-col items-center">
      <div className="xl:w-[80%] w-full mb-10 border-b-2 flex justify-between items-center">
        <div className="">Adaugă un invitat nou.</div>
        {success ? (
          <div className="bg-green-400 py-1 px-2 rounded-md mb-1">
            <div className="">Adăugat!</div>
          </div>
        ) : null}
      </div>
      <form
        action=""
        className="xl:w-[80%] md:w-[30rem] w-full flex flex-col gap-2"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="nope"
          className="h-[2.5rem] ease-in-out duration-300 bg-neutral-100 px-2 rounded-md w-full border-x-2 focus:border-orange-400 outline-none"
          placeholder="Nume si prenume"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          autoComplete="nope"
          className="h-[2.5rem] ease-in-out duration-300 bg-neutral-100 px-2 rounded-md w-full border-x-2 focus:border-orange-400 outline-none"
          placeholder="Locație"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="nope"
          className="h-[2.5rem] ease-in-out duration-300 bg-neutral-100 px-2 rounded-md w-full border-x-2 focus:border-orange-400 outline-none"
          placeholder="Număr de telefon"
        />
        <div className="flex items-center gap-2">
          <div className="">Invitație dată?</div>
          <div
            onClick={(e) => setProvided(!provided)}
            className={`h-[3rem] w-[3rem] flex items-center justify-center ${
              provided === true ? "bg-green-400" : "bg-neutral-200"
            } border-2 cursor-pointer border-neutral-400 rounded-md`}
          >
            Da
          </div>
        </div>
        <div className="flex gap-2">
          <div
            onClick={(e) => setConfirmation(true)}
            className={`p-2 ${
              confirmation === true ? "bg-green-400" : "bg-neutral-200"
            } border-2 cursor-pointer border-neutral-400 rounded-md`}
          >
            <AiOutlineCheck />
          </div>
          <div
            onClick={(e) => setConfirmation(false)}
            className={`p-2 ${
              confirmation === false ? "bg-red-500" : "bg-neutral-200"
            } border-2 cursor-pointer border-neutral-400 rounded-md`}
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="flex">
          <button
            onClick={(e) => addFun(e)}
            className="py-2 px-6 hover:border-orange-400 flex items-center ease-in-out duration-300 w-fit bg-neutral-100 border-x-2 border-neutral-200 rounded-md"
          >
            {isLoading ? <div className="loader h-6 w-6"></div> : "Adaugă"}
          </button>
        </div>
      </form>
    </div>
  );
}
