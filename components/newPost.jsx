import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineLink } from "react-icons/ai";
import Image from "next/image";
import functionStore from "../store/functionStore";
import { client } from "../utils/client";
import useAuthState from "../store/authStore";

export default function NewPost() {
  const { event, newPost, posts } = functionStore();
  const { logged } = useAuthState();
  const [upload, setUpload] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState();
  const [wrongFile, setWrongFile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [content, setContent] = useState("");
  const [user, setUser] = useState();
  const [wCode, setWCode] = useState();
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
    setIsLoading(false);
    setUser(logged?._id);
    setWCode(event?._id);
  }, [event, logged, upload]);
  setTimeout(() => setIsPosting(false), 2000);
  const videoFile = ["video/mp4", "video/webm", "video/ogg"];
  const imageFile = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/ico",
    "image/webp",
    "image/jfif",
  ];
  const uploadAsset = (e) => {
    const selectedFile = e.target.files[0];
    setIsLoading(true);
    if (
      videoFile?.includes(selectedFile?.type) ||
      imageFile?.includes(selectedFile?.type)
    ) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setUpload(data);
          setIsLoading(false);
        });
      videoFile?.includes(selectedFile?.type)
        ? setFileType("video")
        : setFileType("image");
      setWrongFile(false);
    } else {
      setIsLoading(false);
      setWrongFile(true);
    }
  };
  const postFun = () => {
    setIsPosting(true);
    newPost(wCode, user, upload, content, postDate);
    setUpload(undefined);
    setContent("");
  };
  return (
    <div
      className={`border-b-2 border-orange-400  ease-in-out duration-300 w-full h-fit p-2 relative after:absolute after:h-6 after:w-[2px] after:bg-orange-400 after:bottom-0 after:right-0 before:absolute before:h-6 before:w-[2px] before:bg-orange-400 before:bottom-0 before:left-0`}
    >
      <div className="">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Posteaza ceva"
          className={`resize-none bg-transparent  w-full border-2 p-2 h-[3rem] rounded-md outline-none ease-in-out duration-300 focus:h-[7rem]`}
        />
      </div>
      <div
        className={`mt-2 flex  items-center justify-between ${
          upload && "mb-4 border-b-2"
        }`}
      >
        <div className="">
          <button
            className={`p-2 hover:bg-slate-400 ease-in-out relative duration-300 rounded-md `}
          >
            <AiOutlinePlus />
            <input
              onChange={(e) => {
                uploadAsset(e);
              }}
              type="file"
              className="absolute top-0 left-0 w-[2rem] cursor-pointer opacity-0 h-[2rem]"
            />
          </button>
        </div>
        <div className="">
          <button
            onClick={() => postFun()}
            className={`p-2 hover:bg-slate-400 ease-in-out relative duration-300 rounded-md `}
          >
            Postează
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="loader w-8 h-8 border-slate-700 border-b-white"></div>
        </div>
      ) : (
        upload && (
          <div className="w-full relative">
            <Image
              src={upload?.url}
              height="55%"
              width="100%"
              layout="responsive"
              className="object-cover rounded-xl"
            />
            <div className="w-full flex absolute bottom-4 justify-center">
              <button
                onClick={() => setUpload(undefined)}
                className="bg-orange-400 py-2 px-4 rounded-md bg-opacity-70 hover:bg-opacity-100 ease-in-out duration-300"
              >
                Sterge
              </button>
            </div>
          </div>
        )
      )}
      {isPosting ? (
        <div className="w-full flex justify-center">
          <div className="loader"></div>
        </div>
      ) : null}
    </div>
  );
}
