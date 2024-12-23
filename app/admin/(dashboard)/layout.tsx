import { AdminHeader } from "@/components/AdminHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative min-h-screen h-full">
        <AdminHeader />
        <div className="bg-gradient-to-br from-[#E5DEFF] to-background flex">
          {children}
        </div>
      </div>
    </>
  );
}
