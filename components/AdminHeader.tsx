"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import LogoutBtn from "./LogoutBtn";

export const AdminHeader = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full gradient-background z-50 shadow-md">
        <Marquee direction="right" className="py-3">
          <Image src="/van-animated.png" width={112} height={50} alt="van" />
        </Marquee>
        <LogoutBtn />
      </header>
    </>
  );
};
