import { AdminHeader } from "@/components/AdminHeader";
import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative min-h-screen ">
        <AdminHeader />
        <div className="bg-cover bg-center bg-black bg-no-repeat h-[100vh] flex">
          <Sidebar/>
          {children}
        </div>
      </div>
    </>
  );
}
