"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuItem, MenuItemFollow } from "@/components";
import { useGetUsersQuery } from "@/graphql/generated/graphql";

const SideNavMain = () => {
  const { data, loading } = useGetUsersQuery();
  const [showAllUsers, setShowAllUsers] = useState(false);
  const pathname = usePathname();

  const displayedUsers = showAllUsers
    ? data?.getUsers
    : data?.getUsers.slice(0, 3); // Only show the first 3 users

  return (
    <div
      id="SideNavMain"
      className={[
        pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]",
        "fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r  overflow-auto",
      ].join(" ")}
    >
      <div className="lg:w-full w-[55px] mx-auto">
        <Link href="/">
          <MenuItem
            iconString="For You"
            colorString="#F02C56"
            sizeString="30"
          />
        </Link>
        <MenuItem
          iconString="Following"
          colorString="#000000"
          sizeString="27"
        />
        <MenuItem iconString="LIVE" colorString="#000000" sizeString="27" />
        <div className="border-b lg:ml-2 mt-2" />
        <div className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
          Suggested accounts
        </div>
        <div className="lg:hidden block pt-3" />
        <ul>
          {displayedUsers?.map((user) => (
            <li className="cursor-pointer" key={user.id}>
              <Link href={`/profile/${user.id}`}>
                <MenuItemFollow user={user} />
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAllUsers(!showAllUsers)}
          className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]"
        >
          See more
        </button>
        <div className="border-b lg:ml-2 mt-2" />
        <div className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
          Following accounts
        </div>
        <div className="lg:hidden block pt-3" />
        <div className="cursor-pointer">
          <MenuItemFollow
            user={{
              __typename: undefined,
              bio: undefined,
              createdAt: undefined,
              email: "",
              fullname: "",
              id: 0,
              image: undefined,
              password: "",
              updatedAt: undefined,
            }}
          />
        </div>
        <button className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
          See all
        </button>
        <div className="lg:block hidden border-b lg:ml-2 mt-2" />
        <div className="lg:block hidden text-[11px] text-gray-500">
          <div className="pt-4 px-2">
            About Newsroom TikTok Shop Contact Careers ByteDance
          </div>
          <div className="pt-4 px-2">
            TikTok for Good Advertise Developers Transperancy TikTok Rewards
            TikTok Browse TikTok
          </div>
          <div className="pt-4 px-2">2023 TikTok</div>
          <div className="pb-14"></div>
        </div>
      </div>
    </div>
  );
};

export default SideNavMain;
