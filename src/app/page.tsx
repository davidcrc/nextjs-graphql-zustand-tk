import { Feed, Navbar, SideNavMain } from "@/components";

export default function Home() {
  return (
    <>
      <div>
        <SideNavMain />
      </div>

      <div className="ml-[55px] lg:ml-[310px] w-full">
        <Feed />
      </div>
    </>
  );
}
