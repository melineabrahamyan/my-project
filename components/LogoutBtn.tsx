"use client";

import { logoutAdmin } from "@/actions/auth";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.refresh();
  };
  return (
    <div className="h-full absolute flex items-center justify-between  px-10 top-0 right-0 ">
      <button onClick={handleLogout} className="text-xl font-bold z-50">
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
