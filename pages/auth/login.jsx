import React, { useState, useEffect } from "react";
import Link from "next/link";
import useAuthState from "../../store/authStore";
import { AiOutlineCheck } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Login({ setIsRegistering }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [pwIssue, setPwIssue] = useState(false);
  const [noEmailIssue, setNoEmail] = useState(false);
  const [password, setPassword] = useState("");
  const { logged, submitLogin, passwordIssue, noEmail } = useAuthState();
  useEffect(() => {
    setIsLoading(false);
    logged?._id ? setSuccess(true) : null;
    passwordIssue ? setPwIssue(true) : null;
    noEmail ? setNoEmail(true) : null;
  }, [logged, passwordIssue, noEmail]);
  const loginFun = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    submitLogin(email, password);
    router.push("/");
  };
  return (
    <div
      className={` w-full h-full items-center flex justify-center overflow-hidden mt-40 bg-transparent p-2`}
    >
      <div className="lg:w-[40rem] h-[25rem] flex flex-col justify-center items-center bg-white shadow-md shadow-black-400 rounded-xl p-2 border-2 border-black-400 border-opacity-40">
        <div className="flex justify-between items-center w-[80%] mx-20">
          <div className="text-2xl text-neutral-700">
            Te rugam sa te conectezi.
            <div className="text-sm">
              Testing account: test@w-event.com | pw: test
            </div>
          </div>
          <div className="">
            <div className="">
              {isLoading ? (
                <div className="loader w-10 h-10"></div>
              ) : success ? (
                <div className="p-2 border-2 border-orange-400 rounded-full">
                  <AiOutlineCheck className="text-green-400 text-2xl" />
                </div>
              ) : pwIssue ? (
                <div className="text-red-500">Parola incorecta</div>
              ) : noEmailIssue ? (
                <div className="text-red-500">Nu am putut gasi emailul!</div>
              ) : null}
            </div>
          </div>
        </div>
        <form className="mt-10 w-full flex flex-col gap-4 items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Utilizator"
            className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Parola"
            className="w-full bg-neutral-100 border-x-2 border-orange-400 focus:border-red-500 ease-in-out duration-300 border-opacity-40 px-2 outline-none text-neutral-900 rounded-md h-[2.5rem] lg:w-[80%]"
          />
          <Link href={"/"}>
            <button
              onClick={(e) => loginFun(e)}
              className="h-[2.5rem] bg-neutral-100 px-10 border-x-2 border-orange-400 hover:border-red-500 rounded-md ease-in-out duration-300"
            >
              Conectare
            </button>
          </Link>
        </form>
        <div className="w-[80%] mt-6">
          <div onClick={() => setIsRegistering(true)} className="">
            <Link href="/auth/register" as={`/auth/register`}>
              <button className="text-orange-400 font-bold opacity-50 hover:underline">
                Inregistreaza-te
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
