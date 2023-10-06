"use client";

import useGeneralStore from "@/stores/generalStore";
import { AuthOverlay, Feed, Navbar, SideNavMain } from "@/components";

export default function Home() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);

  return (
    <>
      <SideNavMain />

      <Feed>
        <div>feed</div>
      </Feed>

      {/* {isLoginOpen && <AuthOverlay />} */}
    </>
  );
}
