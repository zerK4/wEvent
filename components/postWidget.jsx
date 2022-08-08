import Image from "next/image";
import React, { useState, useEffect } from "react";
import useAuthState from "../store/authStore";
import { BsThreeDots } from "react-icons/bs";
import functionStore from "../store/functionStore";
import CommentWidget from "./commentWidget";

export default function PostWidget({
  content,
  img,
  topic,
  id,
  postedBy,
  created,
  users,
  comment,
}) {
  const { isPosting, fetchPosts, deletePost } = functionStore();
  const { logged } = useAuthState();
  const [user, setUser] = useState();
  const [delActive, setDelActive] = useState(false);
  useEffect(() => {
    setUser(users.find((x) => x._id === postedBy._ref));
    !img?.image?.img?.asset?.url ? fetchPosts(logged?.wCode?._ref) : null;
  }, [users]);
  return (
    <div
      className={`w-full border-l-2 px-4 ease-in-out duration-300 py-6 border-orange-400 relative
        hover:bg-slate-100 bg-neutral-100
      after:absolute after:h-[2px] after:w-6 after:bg-orange-400 after:bottom-0 after:left-0 before:absolute before:h-[2px] before:w-6 before:bg-orange-400 before:top-0 before:left-0`}
    >
      {logged?._id === postedBy._ref && (
        <div className="absolute flex items-center gap-2 right-2 top-2 cursor-pointer ">
          <div className={`${delActive ? "flex" : "hidden"}`}>
            <button
              onClick={() => deletePost(id)}
              className={`border-2 ease-in-out duration-300 py-1 px-2 rounded-md hover:border-red-500`}
            >
              Delete
            </button>
          </div>
          <div
            onClick={() => setDelActive(!delActive)}
            className={`rounded-full hover:border-neutral-400
            border-2 p-1 ease-in-out duration-300`}
          >
            <BsThreeDots className="text-2xl text-neutral-500 " />
          </div>
        </div>
      )}
      <div className="w-full">
        <div
          className={`user flex gap-2 w-full justify-start border-b-2 
          border-neutral-300
          pb-2 mb-2`}
        >
          {user?.profileImage?.asset?.url ? (
            <div className="h-[3rem] w-[3rem] rounded-full border-2 border-orange-400">
              <Image
                src={user?.profileImage?.asset?.url}
                height="100%"
                width="100%"
                layout="responsive"
                className="object-cover rounded-full "
              />
            </div>
          ) : (
            <div className="loader"></div>
          )}
          <div className="flex flex-col items-start">
            <div className="">{user?.userName}</div>
            <div className="text-neutral-400">{created}</div>
          </div>
        </div>
        <div className="mb-2">{content}</div>
        <div className="">
          {img?.image?.img?.asset?.url ? (
            <div className="h-fit rounded-md w-full">
              <Image
                src={img?.image?.img?.asset?.url}
                height="50%"
                width="100%"
                layout="responsive"
                className="object-cover rounded-md "
                priority
              />
            </div>
          ) : null}
          <div className="text-neutral-400 underline flex gap-2">
            {topic?.map((x, i) => (
              <div key={i}>#{x.topic}</div>
            ))}
          </div>
        </div>
        <div className={`mt-4 border-t-2 border-neutral-300 pt-2`}>
          <CommentWidget id={id} comment={comment} users={users} />
        </div>
      </div>
    </div>
  );
}
