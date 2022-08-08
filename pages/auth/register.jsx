import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineCheck } from "react-icons/ai";
import functionStore from "../../store/functionStore";

export default function Register({ setIsRegistering }) {
  const { event, fetchEvent } = functionStore();
  const router = useRouter(0);
  const [wCode, setWCode] = useState("");
  const [code, setCode] = useState("");
  const [currentEvent, setCurrentEvent] = useState();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [regEvent, setRegEvent] = useState({});

  useEffect(() => {
    success ? setIsLoading(false) : null;
    success ? setTimeout(() => router.push("/auth/login"), 2000) : null;
    notFound ? setTimeout(() => router.push("/auth/register"), 2000) : null;
  }, [success]);
  useEffect(() => {
    currentEvent
      ? setRegEvent({
          _type: "reference",
          _ref: currentEvent[0]?._id,
        })
      : null;
  }, [currentEvent]);

  const submitRegister = async (e) => {
    setIsLoading(true);
    setNotFound(false);
    e.preventDefault();
    const { data } = await axios.post(`/api/auth/register`, {
      userName: userName,
      password: password,
      email: email,
      phone: phone,
      wCode: regEvent,
      role: role,
    });
    setSuccess(data);
    setIsRegistering(false);
  };
  const checkCode = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setWCode(code);
    const { data } = await axios.post(`/api/auth/code`, {
      wCode: code,
    });
    console.log(data);
    setCurrentEvent(data);

    if (data !== "nf") {
      setValidated(true);
      setIsLoading(false);
    }
    if (data === "nf") {
      setNotFound(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden bg-transparent p-2">
      {validated === true ? (
        <div className="lg:w-[40rem] h-fit flex flex-col justify-center items-center bg-white shadow-md shadow-black-400 rounded-xl p-2 border-2 border-black-400 border-opacity-40">
          <div className="flex justify-between items-center w-[80%] mx-20">
            <div className="text-2xl text-neutral-700">
              Te rugam sa completezi urmatoarele.
            </div>
            <div className="">
              {isLoading ? (
                <div className="loader w-8 h-8"></div>
              ) : success ? (
                <div className="p-2 border-2 border-orange-400 rounded-full">
                  <AiOutlineCheck className="text-3xl text-green-400" />
                </div>
              ) : null}
            </div>
          </div>
          <form className="mt-10 w-full flex flex-col gap-4 items-center">
            <input
              type="text"
              defaultValue={wCode}
              contentEditable="false"
              className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Rolul (eg. Nas, Nasa, etc.)"
              className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
            />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nume, prenume"
              className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefon"
              className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
            />
            <input
              type="email"
              autoComplete="nope"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresa email"
              className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parola"
              className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
            />
            <button
              onClick={(e) => submitRegister(e)}
              className="h-[2.5rem] bg-neutral-100 px-10 border-x-2 border-orange-400 hover:border-red-500 rounded-md ease-in-out duration-300"
            >
              Inregistrare
            </button>
          </form>
          <div className="w-[80%] mt-6">
            <div onClick={() => setIsRegistering(false)} className="">
              <Link href="/auth/login" as={`/auth/login`}>
                <button className="text-orange-400 font-bold opacity-50 hover:underline">
                  Conectare
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border-2 shadow-md shadow-black p-4 rounded-xl flex flex-col items-center gap-4">
          <div className={`${isLoading ? "hidden" : "block"} relative`}>
            <div className={`${notFound ? "text-red-400" : null}`}>
              {notFound
                ? "Ne pare rau, nu am gasit evenimentul, incercati din nou."
                : "Te rog sa introduci codul evenimentului."}
            </div>
            <div className="absolute -top-16 text-neutral-500 select-none left-0 w-full">
              Daca vrei doar sa incerci aplicatia, foloseste{" "}
              <span className="text-red-500 font-bold">test-guest</span> ca si
              cod.
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="">Cateva momente, cautam evenimentul.</div>
              <div className="loader"></div>
            </div>
          ) : (
            <form className="flex flex-col w-full items-center gap-2">
              <input
                type="text"
                placeholder="Cod"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[15rem]"
              />
              <button
                onClick={(e) => checkCode(e)}
                className="h-[2.5rem] bg-neutral-100 px-10 border-x-2 border-orange-400 hover:border-red-500 rounded-md ease-in-out duration-300"
              >
                Start!
              </button>
              <div className="text-sm mt-2 text-neutral-500">
                <div className="">
                  Codul este obtinut de la miri sau de la cine a creat deja
                  evenimentul.
                </div>
                <div className="">
                  Daca vrei sa creezi un nou eveniment apasa{" "}
                  <span className="text-orange-400">aici</span>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
