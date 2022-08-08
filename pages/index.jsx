import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Login from "./auth/login";
import useAuthState from "../store/authStore";
import functionStore from "../store/functionStore";
import { AiOutlinePlus, AiFillCamera } from "react-icons/ai";
import PostWidget from "../components/postWidget";
import NewPost from "../components/newPost";

export default function Home() {
  const { logged } = useAuthState();
  const { event, fetchEvent, fetchPosts, posts, fetchUser, users, isPosting } =
    functionStore();
  const [currentEvent, setCurrent] = useState();
  const [losPosts, setPosts] = useState();
  useEffect(() => {
    fetchEvent(logged?.wCode?._ref);
    fetchPosts(logged?.wCode?._ref);
    fetchUser();
  }, [logged]);
  useEffect(() => {
    setPosts(posts);
    setCurrent(event);
  }, [posts]);
  return (
    <div className={`min-h-screen w-full lg:w-full px-1 md:px-4`}>
      <Head>
        <title>Event Planer</title>
        <meta name="description" content="Wedding planner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:w-[80%] w-full flex flex-col items-center gap-2">
        <div className="w-full flex flex-col -mt-6 mb-6 items-center">
          <NewPost />
        </div>
        {losPosts?.length == 0 ? (
          <div className="mt-20">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="mt-2 w-full flex flex-col gap-4">
            {losPosts?.map((x) => (
              <PostWidget
                key={x._id}
                content={x.content}
                img={x}
                postedBy={x.postedBy}
                created={x.created}
                topic={x.topic}
                id={x._id}
                users={users}
                comment={x.comment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
