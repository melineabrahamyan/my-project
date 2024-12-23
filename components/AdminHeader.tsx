"use client";

import Image from "next/image";
import LogoutBtn from "./LogoutBtn";
import Link from "next/link";

const menuItems = [
  {
    imageUrl: "/dashboard.png",
    label: "DASHBOARD",
    href: "/admin/dashboard",
    width: 30,
    height: 30,
  },
  {
    imageUrl: "/email.png",
    label: "SEND EMAIL",
    href: "/admin/send-email",
    width: 37,
    height: 30,
  },
  {
    imageUrl: "/profile.png",
    label: "PROFILE",
    href: "/admin/change-password",
    width: 35,
    height: 45,
  },
];

export const AdminHeader = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full py-4 px-6 flex items-center justify-between shadow-md bg-gradient-to-br from-[#E5DEFF] to-background z-50">
        <div className="sm:hidden flex items-center gap-5">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Image
                src={item.imageUrl}
                alt={item.label}
                width={item.width}
                height={item.height}
                priority
                className="mx-auto"
              />
            </Link>
          ))}
        </div>

        <div className="space-x-5 hidden sm:block">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <button className="text-purple-500 font-bold text-xl">
                {item.label}
              </button>
            </Link>
          ))}
        </div>

        <LogoutBtn />
      </header>
    </>
  );
};
