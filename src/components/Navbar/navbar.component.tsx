"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import tikTokLogo from "@/assets/images/tiktok-logo.png";
import {
  AiOutlineSearch,
  AiOutlineFileSearch,
  AiOutlineUpload,
} from "react-icons/ai";
import Login from "./login";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div
      id="Navbar"
      className="bg-white fixed z-30 flex items-center w-full border-b h-[61px]"
    >
      <div
        className={[
          pathname === "/" ? "max-w-[1150px]" : "",
          "flex items-center justify-between w-full px-6 mx-auto",
        ].join(" ")}
      >
        <div className={pathname === "/" ? "w-[20%]" : "lg:w-[20%] w-[70%]"}>
          <Link href="/">
            <Image
              src={tikTokLogo}
              width={pathname === "/" ? "100" : "50"}
              height={pathname === "/" ? "100" : "50"}
              alt="logo"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center bg-[#F1F1F1] p-1 rounded-full max-w-[380px] w-full">
          <input
            type="text"
            className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
            placeholder="Search accounts"
          />
          <div className="px-3 py-1 flex items-center border-l border-l-gray-3">
            <AiOutlineSearch size="20" color="#838383" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full">
          {pathname === "/" ? (
            <Link
              href="/upload"
              className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
            >
              <AiOutlineUpload size="20" color="#161724" />
              <span className="px-2 font-medium text-[15px] text-[#161724]">
                Upload
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
            >
              <AiOutlineFileSearch size="20" color="#161724" />
              <span className="px-2 font-medium text-[15px] text-[#161724]">
                Feed
              </span>
            </Link>
          )}

          <Login />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
