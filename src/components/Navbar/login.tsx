import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDotsVertical, BsFillSendFill } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";
import useGeneralStore from "../../stores/generalStore";
import { useLogoutUserMutation } from "../../graphql/generated/graphql";
import { useUserStore } from "../../stores/userStore";

const Login = () => {
  const [showMenu, setShowMenu] = useState(false);

  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);
  const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen);
  const user = useUserStore((state) => state);
  const setUser = useUserStore((state) => state.setUser);
  const [logoutUser, { loading, error, data }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      // empty the user store
      setUser({
        id: "",
        fullname: "",
        email: "",
        bio: "",
        image: "",
      });
      setIsLoginOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!user.id && (
        <div className="flex items-center">
          <button
            onClick={() => setIsLoginOpen(!isLoginOpen)}
            className="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px] min-w-[110px]"
          >
            <span className="mx-4 font-medium text-[15px]">Log In</span>
          </button>
          <BsThreeDotsVertical size="25" color="#161724" />
        </div>
      )}
      <div className="flex items-center gap-2">
        <BsFillSendFill size="25" color="#161724" />
        <BiMessageDetail size="25" color="#161724" />
        <div className="relative">
          <button className="mt-1" onClick={() => setShowMenu(!showMenu)}>
            <Image
              className="rounded-full"
              height="33"
              width="33"
              alt=""
              src={
                !user.image ? "https://picsum.photos/id/83/300/320" : user.image
              }
            />
          </button>
          {showMenu && (
            <div
              id="PopupMenu"
              className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2"
            >
              <Link
                onClick={() => setShowMenu(!showMenu)}
                href={"/profile/" + user.id}
                className="flex flex-col px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {" "}
                <BsFillPersonFill size="20" color="#161724" />
                <span className="font-semibold text-sm">Profile</span>
              </Link>
              {user.id && (
                <div
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <GrLogout size="20" color="#161724" />
                  <span className=" font-semibold text-sm">Log out</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
