"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import XIcon from "@/components/icons/x-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import { sendUserIPAddress } from "@/actions/statistics";

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
    <Card className="w-full max-w-md p-8 animate-fade-in-scale bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
      <div className="space-y-6">
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

          <button
            disabled
            className="group social-button hover:bg-primary/90  disabled:cursor-not-allowed"
          >
            <XIcon width={20} height={20} className="group-hover:fill-white" />
            <span className="group-hover:text-white">Continue with X</span>
          </button>

          <button
            disabled
            className="group social-button hover:bg-primary/90 hover:text-white disabled:cursor-not-allowed"
          >
            <LinkedInIcon
              width={20}
              height={20}
              className="fill-[#0077B7] group-hover:fill-white"
            />
            <span>Continue with LinkedIn</span>
          </button>

          <div className="divider">
            <span className="text-xs text-black font-semibold">
              Please use your work email
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </Card>
  );
};

export default SignUp;
