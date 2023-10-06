"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { GiBoxCutter } from "react-icons/gi";
import { UploadError } from "@/components";
import mobileCase from "@/assets/images/mobile-case.png";
import tikTokLogoWhite from "@/assets/images/tiktok-logo-white.png";
import { useCreatePostMutation } from "@/graphql/generated/graphql";

const UploadPage = () => {
  const fileRef = React.useRef<HTMLInputElement>(null);

  const [show, setShow] = React.useState(false);

  const [file, setFile] = React.useState<File | null>(null);
  const [fileDisplay, setFileDisplay] =
    React.useState<string | undefined>(undefined);
  const [errorType, setErrorType] = React.useState<string | null>(null);
  const [caption, setCaption] = React.useState<string>("");
  const [fileData, setFileData] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const [createPostMutation, { loading }] = useCreatePostMutation({
    onError: (err) => {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions?.errors);
    },
    variables: {
      text: caption,
      video: fileData,
    },
  });

  const handleCreatePost = async () => {
    try {
      console.log("FILDATA!", fileData);
      setIsUploading(true);

      await createPostMutation();

      setIsUploading(false);
      setShow(true);
      // clearVideo();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileDisplay(URL.createObjectURL(event.target.files[0]));
      setFileData(event.target.files[0]);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    setErrorType(null);
    setFile(event.dataTransfer.files[0]);

    const extension = event.dataTransfer.files[0].name.split(".").pop();
    if (extension !== "mp4") {
      setErrorType("file");
      return;
    }

    setFileDisplay(URL.createObjectURL(event.dataTransfer.files[0]));
    console.log(fileDisplay);
  };

  const discard = () => {
    setFile(null);
    setFileDisplay(undefined);
    setCaption("");
  };

  const clearVideo = () => {
    setFile(null);
    setFileDisplay(undefined);
  };

  useEffect(() => {
    console.log(caption.length);
    if (caption.length === 150) {
      setErrorType("caption");
      return;
    }

    setErrorType(null);
    console.log("caption", errorType);
  }, [errorType, caption]);

  return (
    <>
      <UploadError errorType={errorType} />
      <div className="bg-[#F8f8f8] h-[100vh]">
        <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
          <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
            <div>
              <div className="text-[23px] font-semibold">Upload video</div>
              <div className="text-gray-400 mt-1">
                Post a video to your account
              </div>
            </div>
            <div className="mt-8 md:flex gap-6">
              {!fileDisplay ? (
                <label
                  onDragOver={(event) => {
                    event.preventDefault(); // Prevent default behavior on drag over
                  }}
                  onDragEnter={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    onDrop(event);
                    console.log("drop");
                  }}
                  htmlFor="fileInput"
                  className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <FiUploadCloud size="50" color="#b3b3b1" />
                  <div className="mt-4 text-[17px]">
                    Select a video to upload
                  </div>
                  <div className="mt-1.5 text-gray-500 text-[13px]">
                    Or drag and drop a file
                  </div>
                  <div className="mt-12 text-gray-400 text-sm">MP4</div>
                  <div className="mt-2 text-gray-400 text-[13px]">
                    Up to 30 minutes
                  </div>
                  <div className="mt-2 text-gray-400 text-[13px]">
                    Less than 2 GB
                  </div>
                  <div className="px-2 py-1.5 mt-8 text-white text-[15px] w-80% bg-[#F02C56] rounded-sm">
                    Select file
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept=".mp4"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
              ) : (
                <>
                  <div className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative">
                    <div className="bg-black h-full w-full" />
                    <Image
                      className="absolute z-20 pointer-events-none"
                      src={mobileCase}
                      fill
                      alt=""
                    />
                    <Image
                      className="absolute right-4 bottom-6 z-20"
                      width="90"
                      height="90"
                      src={tikTokLogoWhite}
                      alt=""
                    />
                    <video
                      className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                      src={fileDisplay}
                      autoPlay
                      loop
                      muted
                    />
                    <div className="absolute -bottom-12 flex items-center justify-between border-gray-300 w-full p-2 border rounded-xl z-50  ">
                      <div className="flex items-between truncate">
                        <IoCheckmarkDoneCircleOutline
                          size="16"
                          className="min-w-[16px]"
                        />
                        <div className="text-[11px] pl-1 truncate text-ellipsis">
                          {fileData?.name}
                        </div>
                      </div>
                      <button
                        onClick={clearVideo}
                        className="text-[11px] ml-4 font-semibold"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 mb-6 w-full">
                    <div className="flex bg-[#F8F8F8] py-4 px-6">
                      <GiBoxCutter className="mr-4" size="20" />

                      <div>
                        <div className="text-semibold text-[15px] mb-1.5">
                          Devide videos and edit
                        </div>
                        <div className="text-semibold text-[13px] text-gray-400">
                          You can quickly devide videos into multiple clips and
                          edit them.
                        </div>
                      </div>
                      <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                        <button className="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <div className="mb-1 text-[15px]">Caption</div>
                        <div className="text-gray-400 text-[12px]">
                          {caption.length}
                        </div>
                      </div>
                      <input
                        onChange={(event) => setCaption(event.target.value)}
                        maxLength={150}
                        className="w-full border p-2.5 rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={discard}
                        className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
                      >
                        Discard
                      </button>
                      <button
                        onClick={handleCreatePost}
                        className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
