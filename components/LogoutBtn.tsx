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
    <button
      className="px-2 py-2 rounded-sm bg-purple-500 text-xl font-bold text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
