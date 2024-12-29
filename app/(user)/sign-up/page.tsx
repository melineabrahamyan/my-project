"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { sendUserIPAddress } from "@/actions/statistics";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const SignUp = () => {
  useEffect(() => {
    const sendIP = async () => {
      const isSent = localStorage.getItem("ipSent");
      if (isSent) {
        return;
      }

      try {
        await sendUserIPAddress();

        localStorage.setItem("ipSent", "true");
      } catch (error) {
        console.error("Error sending IP address:", error);
      }
    };

    sendIP();
  }, []);

  return (
    <Card className="w-full relative max-w-md p-8 animate-fade-in-scale bg-white bg-opacity-80 shadow-md backdrop-blur-sm mt-5 sm:mt-0">
      <div className="space-y-6 relative">
        <Link href="/">
          <ChevronLeftIcon className="w-6 h-6 absolute top-[-86px] sm:top-0 left-[-30px] sm:left-[-70px] text-white" />
        </Link>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose your preferred sign-up method
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/google">
            <button className="social-button hover:bg-primary/90 hover:text-white">
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </Link>

          <Link href="/email">
            <button className="social-button hover:bg-primary/90 hover:text-white">
              <Mail className="w-5 h-5" />
              <span>Continue with Email</span>
            </button>
          </Link>

          <div className="divider">
            <span className="text-xs text-black font-semibold">
              Please use your work email
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground max-w-[300px] mx-auto">
          By signing up, you agree to use this platform responsibly.
        </p>
      </div>
    </Card>
  );
};

export default SignUp;
