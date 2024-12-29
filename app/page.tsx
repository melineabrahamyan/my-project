import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Layout from "@/components/layout";

const Home = () => {
  return (
    <>
      <Layout>
        <h1 className="text-3xl lg:text-4xl  xl:text-5xl 2xl:text-6xl font-extrabold text-white font-mono relative">
          <span className="relative z-10">
            Where Efficiency Meets Excellence. <br /> Your{" "}
            <span className="text-[#FAB01C]">Gateway</span> To Seamless
            Logistics!
          </span>
          <Image
            src="/rectangle.png"
            width={128}
            height={128}
            alt="logo"
            className="absolute right-0 -top-16 z-0 w-28 md:w-32"
          />
        </h1>

        <p className="text-white capitalize font-bold text-lg font-mono">
          become a part of our global network
        </p>
        <div className="flex flex-col items-center mt-6">
          <Link href="/sign-up">
          <Button className="bg-[#FAB01C] text-lg text-black hover:bg-yellow-600 rounded-none font-bold px-10 py-8">
            Register Now
            <ArrowRightIcon className="w-4 h-4 ml-1.5" />
          </Button>
          </Link>
          <p className="mt-4 text-white text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#FAB01C] font-bold underline hover:text-yellow-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Home;
