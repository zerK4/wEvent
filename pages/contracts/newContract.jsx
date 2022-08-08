import React, { useState, useEffect } from "react";
import useAuthState from "../../store/authStore";
import functionStore from "../../store/functionStore";
import { AiOutlineUpload } from "react-icons/ai";
import { client } from "../../utils/client";
import { AiFillDelete } from "react-icons/ai";

export default function NewContract() {
  const { logged } = useAuthState();
  const { contracts, newContract } = functionStore();
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [cNumber, setCNumber] = useState("");
  const [price, setPrice] = useState("");
  const [upload, setUpload] = useState();
  useEffect(() => {
    setIsPosting(false);
    isPosting ? setIsPosted(true) : setIsPosted(false);
    setTimeout(() => setIsPosted(false), 3000);
  }, [contracts]);
  const uploadAsset = (e) => {
    setIsUploading(true);
    const selectedFile = e.target.files[0];
    client.assets
      .upload("file", selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((data) => {
        setUpload(data);
        setIsUploading(false);
      });
  };
  const newC = (e) => {
    e.preventDefault();
    setIsPosting(true);
    newContract(
      logged?.wCode?._ref,
      name,
      cNumber,
      service,
      phone,
      email,
      price,
      upload
    );
    setName("");
    setService("");
    setCNumber("");
    setPhone("");
    setEmail("");
    setPrice("");
    setUpload(undefined);
  };
  return (
    <div className="p-2 w-full lg:w-[50%]">
      <div className="w-full border-b-2 py-2 flex justify-between items-center">
        <div className="">Adauga un contract nou.</div>
        <div
          className={`p-2 bg-green-400 rounded-md ${
            isPosted
              ? "translate-y-0 opacity-100 movement"
              : "-traslated-y-[100vh] opacity-0 movement"
          } movement`}
        >
          Adaugat
        </div>
      </div>
      <form className="w-full mt-2 flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="nope"
          placeholder="Nume Furnizor"
          className="bg-neutral-100 h-[2.5rem] px-2 rounded-md outline-none focus:bg-slate-200 border-2 focus:border-orange-400 ease-in-out duration-300 w-full"
        />
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          autoComplete="nope"
          placeholder="Servicii furnizor"
          className="bg-neutral-100 h-[2.5rem] px-2 rounded-md outline-none focus:bg-slate-200 border-2 focus:border-orange-400 ease-in-out duration-300 w-full"
        />
        <input
          type="text"
          value={cNumber}
          onChange={(e) => setCNumber(e.target.value)}
          autoComplete="nope"
          placeholder="Numar Contract"
          className="bg-neutral-100 h-[2.5rem] px-2 rounded-md outline-none focus:bg-slate-200 border-2 focus:border-orange-400 ease-in-out duration-300 w-full"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="nope"
          placeholder="Numar telefon"
          className="bg-neutral-100 h-[2.5rem] px-2 rounded-md outline-none focus:bg-slate-200 border-2 focus:border-orange-400 ease-in-out duration-300 w-full"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="nope"
          placeholder="Adresa email"
          className="bg-neutral-100 h-[2.5rem] px-2 rounded-md outline-none focus:bg-slate-200 border-2 focus:border-orange-400 ease-in-out duration-300 w-full"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          autoComplete="nope"
          placeholder="Pret (LEI)"
          className="bg-neutral-100 h-[2.5rem] px-2 rounded-md outline-none focus:bg-slate-200 border-2 focus:border-orange-400 ease-in-out duration-300 w-full"
        />
        <div className="flex w-full gap-2 items-center">
          <div className="relative w-full">
            <button className="w-full h-[2.5rem] gap-2 flex justify-center items-center bg-slate-200 border-2 rounded-md border-neutral-300 hover:bg-slate-400 ease-in-out duration-300">
              {isUploading ? (
                <div className="loader h-6 w-6"></div>
              ) : (
                <div className="flex gap-2 items-center">
                  <AiOutlineUpload className="text-2xl" />
                  <div className="">
                    {upload ? upload.originalFilename : "Adauga contract"}
                  </div>
                </div>
              )}
            </button>
            <input
              onChange={(e) => uploadAsset(e)}
              type="file"
              className="absolute left-0 top-0 h-full cursor-pointer rounded-md w-full opacity-0"
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setUpload(undefined);
            }}
            className="bg-slate-400 p-2 flex items-center justify-center rounded-md border-2 hover:border-orange-400 ease-in-out duration-300"
          >
            <AiFillDelete />
          </button>
        </div>
        <div className="w-full">
          <button
            onClick={(e) => newC(e)}
            className="bg-slate-400 w-full flex items-center justify-center h-[2.5rem] rounded-md border-2 hover:border-orange-400 ease-in-out duration-300"
          >
            {isPosting ? (
              <div className="loader h-6 w-6"></div>
            ) : (
              <p className="">Postează</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
