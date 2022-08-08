import React, { useState, useEffect } from "react";
import functionStore from "../../store/functionStore";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { FcInvite, FcApproval, FcClock, FcCancel } from "react-icons/fc";

const Profile = ({ id }) => {
  const { updateUser, getOne, oneUser, oneID } = functionStore();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [confirmation, setConfirmation] = useState();
  const [theId, setTheId] = useState();
  const [location, setLocation] = useState();
  const [invited, setInvited] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    getOne(theId);
    if (!id) {
      setTheId(oneID);
    } else {
      setTheId(id.id);
    }
  }, [id, oneID]);
  useEffect(() => {
    setName(oneUser?.mName);
    setPhone(oneUser?.phone);
    setConfirmation(oneUser?.confirmed);
    setLocation(oneUser?.location);
    setInvited(oneUser?.provided);
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }, [id, oneUser]);

  const updateFun = () => {
    setIsLoading(true);
    updateUser(theId, name, location, phone, confirmation, invited);
  };

  return (
    <div className="px-4 md:w-[40rem] w-full">
      <div className="pb-1 mb-3 border-b-2 flex items-center justify-between">
        <div className="">Invitatie {name}</div>
        <div className="">
          <button
            onClick={() => updateFun()}
            className="py-1 px-3 bg-orange-400 rounded-md font-bold border-2 text-neutral-100 hover:bg-orange-600 ease-in-out duration-300 border-neutral-400"
          >
            {isLoading ? (
              <div className="loader w-5 h-5 border-white border-b-transparent"></div>
            ) : success ? (
              <div className="">Modificat!</div>
            ) : (
              "Modifică"
            )}
          </button>
        </div>
      </div>
      {!name ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="loader h-8 w-8"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-200 h-[2.5rem] px-2 w-full lg:w-[80%] rounded-md outline-none border-x-2 focus:border-orange-400 ease-in-out duration-300"
            />
            <p className="text-neutral-400 select-none">Nume</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-neutral-200 h-[2.5rem] px-2 w-full lg:w-[80%] rounded-md outline-none border-x-2 focus:border-orange-400 ease-in-out duration-300"
            />
            <p className="text-neutral-400 select-none">Locatie</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-neutral-200 h-[2.5rem] px-2 w-full lg:w-[80%] rounded-md outline-none border-x-2 focus:border-orange-400 ease-in-out duration-300"
            />
            <p className="text-neutral-400 select-none">Telefon</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="">Confirma?</div>
            <div
              onClick={() => setConfirmation(true)}
              className={`p-2 border-2 rounded-md ${
                confirmation === true && "bg-green-400"
              }`}
            >
              <FcApproval className="text-2xl" />
            </div>
            <div
              onClick={() => setConfirmation(false)}
              className={`p-2 border-2 rounded-md ${
                confirmation === false && "bg-red-500"
              }`}
            >
              <FcCancel className="text-2xl" />
            </div>
            <div
              className={`p-2 border-2 rounded-md ${
                confirmation === null && "bg-neutral-500"
              }`}
              onClick={() => setConfirmation(null)}
            >
              <FcClock className="text-2xl" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="">Invitat?</div>
            <div
              onClick={() => setInvited(true)}
              className={`p-2 border-2 rounded-md cursor-pointer ${
                invited === true && "bg-green-500"
              }`}
            >
              Da
            </div>
            <div
              onClick={() => setInvited(false)}
              className={`p-2 border-2 rounded-md cursor-pointer ${
                invited === false && "bg-red-500"
              }`}
            >
              Nu
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
export async function getServerSideProps({ query }) {
  const id = query;
  return { props: { id: id } };
}
