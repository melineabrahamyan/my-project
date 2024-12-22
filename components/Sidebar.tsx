"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";

const Sidebar = () => {
  const menuItems = [
    {
      imageUrl: "/dashboard.png",
      label: "DASHBOARD",
      href: "/admin/dashboard",
      width: 40,
      height: 40,
    },
    {
      imageUrl: "/email.png",
      label: "SEND EMAIL",
      href: "/admin/send-email",
      width: 45,
      height: 33,
    },
    {
      imageUrl: "/profile.png",
      label: "PROFILE",
      href: "/admin/change-password",
      width: 45,
      height: 45,
    },
  ];

  return (
    <Card className="fixed left-10 top-32 bottom-10 w-[100px] bg-opacity-80 bg-transparent shadow-lg backdrop-blur-sm flex flex-col justify-center items-center px-[10px] py-8 gap-8">
      {menuItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <button
            className={cn(
              "relative group h-20 w-20 mx-auto rounded-lg border-none outline-none"
            )}
          >
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={item.width}
              height={item.height}
              priority
              className="mx-auto"
            />
            <span className="absolute top-0 left-[50px] bg-burgundy text-xs px-5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {item.label}
            </span>
          </button>
        </Link>
      ))}
    </Card>
  );
};

export default Sidebar;
