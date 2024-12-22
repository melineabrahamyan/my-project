import { Footer } from "./footer";
import { Header } from "./header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex  flex-col items-center justify-between min-h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/van.png')" }}
    >
      <Header />
      <main className="flex w-full flex-col bg-black bg-opacity-50 items-center justify-center flex-grow text-center px-4  p-6 shadow-md space-y-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
