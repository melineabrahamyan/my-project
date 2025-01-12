import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <div className="flex-1 flex ">
          <Link href="/">
            <Image src="/logo.svg" width={75} height={62} alt="logo" />
          </Link>
        </div>

        <div className="hidden md:block flex-1 text-center font-bold text-xs sm:text-sm text-gray-800 font-mono">
          The <span className="text-[#FAB01C] font-extrabold">best</span>{" "}
          transportation logistics in the USA
        </div>

        <div className="flex-1 flex justify-center"></div>
      </div>
    </header>
  );
};
