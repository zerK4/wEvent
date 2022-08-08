import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthState from "../store/authStore";
import functionStore from "../store/functionStore";

export default function CommentWidget({ comment, users, id }) {
  const { logged } = useAuthState();
  const { postComment, upComment } = functionStore();
  const [currentUser, setCurrent] = useState();
  const [theComm, setTheComm] = useState();
  const [currComm, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const theDate = new Date();
  const postingDate = theDate.toLocaleDateString("ro", options);
  const [postDate, setPostDate] = useState(postingDate);
  useEffect(() => {
    setCurrent(logged);
    setIsLoading(false);
  }, [users, comment, logged]);

  const postingComment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postComment(id, currComm, currentUser, postDate);
    setComment("");
  };

  return (
    <div className="">
      <div
        className={`border-r-2 border-neutral-400 relative flex pr-4 py-4 flex-col gap-2 ${
          comment &&
          `after:absolute after:h-[2px] after:w-2 after:bg-neutral-400 before:bg-neutral-400 after:bottom-0 after:right-0 before:absolute before:h-[2px] before:w-2  before:top-0 before:right-0`
        }`}
      >
        {!comment ? (
          <div className="text-neutral-400">Nici un comentariu..</div>
        ) : (
          <div>
            {comment?.slice(0, 4).map((x) => (
              <div key={x._key} className="">
                <div
                  className={`p-2 rounded-l-md hover:bg-neutral-300 ease-in-out duration-300`}
                >
                  {users.map((user) =>
                    user?._id === x?.postedBy?._ref ? (
                      <div key={user._id} className="flex gap-2 items-center">
                        {user?.profileImage?.asset?.url ? (
                          <div className="w-10 h-10">
                            <Image
                              src={user?.profileImage?.asset?.url}
                              height="100%"
                              width="100%"
                              layout="responsive"
                              className="object-cover rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="loader h-6 w-6"></div>
                        )}
                        <div className="flex flex-col justify-center w-full">
                          <div
                            className={`flex gap-2 items-center border-b-2 border-l-2 px-2 w-full`}
                          >
                            <div className="">{user.userName}</div>
                            <div className="text-sm text-neutral-500">
                              {x.created}
                            </div>
                          </div>
                          <div className="">{x.comment}</div>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="">
          {comment?.length > 3 ? "Vezi toate comentariile" : null}
        </div>
      </div>
      <div className="mt-4 rounded-md flex items-center gap-2">
        {currentUser?.profileImage?.asset?.url ? (
          <div className="w-10 h-10">
            <Image
              src={currentUser?.profileImage?.asset?.url}
              height="100%"
              width="100%"
              layout="responsive"
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <div className="loader"></div>
        )}
        <form className="flex gap-2 w-full">
          <input
            value={currComm}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className={`bg-neutral-100 border-b-orange-400 focus:border-x-orange-400 ease-in-out duration-300 h-[3rem] w-full rounded-md outline-none px-2  border-x-2 border-b-2`}
          />
          <button
            onClick={(e) => postingComment(e)}
            className={` h-[3rem] w-[4rem] flex justify-center items-center bg-neutral-100 hover:bg-neutral-300 hover:border-neutral-400 rounded-md ease-in-out duration-300 border-2 `}
          >
            {isLoading ? (
              <div className="loader h-6 w-6"></div>
            ) : (
              <AiOutlinePlus />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
