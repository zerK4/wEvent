import React, { useEffect, useState } from "react";
import useAuthState from "../../store/authStore";
import functionStore from "../../store/functionStore";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import Link from "next/link";

export default function Contracts() {
  const { logged } = useAuthState();
  const { event, contracts, fetchContracts, deleteContract } = functionStore();
  const [contract, setContract] = useState();
  useEffect(() => {
    fetchContracts(logged?.wCode?._ref);
  }, [logged]);
  useEffect(() => {
    setContract(contracts);
  }, [event]);
  return (
    <div className="px-2 w-full  lg:w-fit flex flex-col items-center">
      <div className="h-[3rem] w-full border-b-2 flex items-center justify-between">
        <div className="">Contracte</div>
        <Link href={`/contracts/newContract`}>
          <button className="p-2 border-2 rounded-md bg-slate-300 hover:bg-slate-500 ease-in-out duration-300 active:bg-green-400">
            <AiOutlinePlus />
          </button>
        </Link>
      </div>
      <div className="lg:w-[45rem] w-full">
        <div className="border-b-2 border-neutral-500 flex h-[3rem] items-center justify-between">
          <p className="flex justify-center md:w-[10rem] w-[8rem]">Nume</p>
          <p className="lg:flex justify-center hidden w-[10rem]">Servicii</p>
          <p className="flex justify-center w-[10rem]">Pret</p>
          <p className="flex justify-center w-[10rem]">Contract</p>
          <p className="flex justify-center w-[10rem]">Actiuni</p>
        </div>
        {contract?.length === 0 ? (
          <div className="w-full h-[10rem] flex items-center justify-center gap-4">
            <div className="loader w-5 h-5"></div>
            <div className="">Nu ai nici un contract momentan.</div>
          </div>
        ) : (
          <div className="w-full">
            {contract?.map((x, i) =>
              x.service ? (
                <div
                  key={i}
                  className="h-[4rem] items-center text-center flex justify-between border-b-2 even:bg-neutral-100 hover:bg-neutral-100 ease-in-out duration-300"
                >
                  <div className="md:w-[10rem] w-[5rem]">{x.supplier}</div>
                  <div className="w-[10rem] hidden lg:flex justify-center">
                    {x.service}
                  </div>
                  <div className="md:w-[10rem] w-fit justify-center">
                    {x.price}
                  </div>
                  <div className="md:w-[10rem] w-fit flex justify-center">
                    {x?.contractFile?.asset?.url !== undefined ? (
                      <Link
                        href={x?.contractFile?.asset?.url}
                        as={`/contract/${x?.contractFile?.asset?.id}`}
                      >
                        <div className="p-2 hover:bg-slate-300 rounded-md ease-in-out duration-300 cursor-pointer">
                          <FaFileDownload className="text-2xl text-slate-500" />
                        </div>
                      </Link>
                    ) : (
                      <div className="loader h-5 w-5"></div>
                    )}
                  </div>

                  <div className="text-center md:w-[10rem] w-fit mr-4 ">
                    <div className="flex justify-center gap-2">
                      <div
                        onClick={() => deleteContract(x._id)}
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
}
