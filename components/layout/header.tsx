"use client";

import { getSupportEmail } from "@/actions/support-email";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";

export const Header = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("supportEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      const fetchEmail = async () => {
        const supportEmail = await getSupportEmail();
        setEmail(supportEmail);
        if (supportEmail) {
          sessionStorage.setItem("supportEmail", supportEmail);
        }
      };

      fetchEmail();
    }
  }, []);

  return (
    <header className="w-full bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <div className="flex-1 flex">
          <Link href="/">
            <Image src="/logo.svg" width={75} height={62} alt="logo" />
          </Link>
        </div>

        <div className="hidden md:block flex-1 text-center font-bold text-xs sm:text-sm text-gray-800 font-mono">
          The <span className="text-[#FAB01C] font-extrabold">best</span>{" "}
          transportation logistics in the USA
        </div>

        <div className="flex-1 flex justify-end items-center">
          {email && (
            <Link
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-gray-800 hover:text-[#FAB01C] transition"
            >
              <HiOutlineMail className="text-lg" />
              <span className="text-xs sm:text-sm font-medium">{email}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
