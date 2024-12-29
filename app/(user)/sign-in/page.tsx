"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { checkUserExistence } from "@/actions/user";
import InProgress from "@/components/InProgress";
import { useToast } from "@/hooks/use-toast";

const Email = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email.trim().length && password.trim().length) {
        const doesExist = await checkUserExistence(email);
        if (doesExist) {
          setEmail("");
          setPassword("");
          setShowModal(true);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please provide valid credentials.",
            duration: 3000,
          });
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showModal ? (
        <InProgress />
      ) : (
        <Card className="max-w-md w-full p-12 pt-0  animate-fade-in-scale relative z-10 mt-5 sm:mt-0">
          <div className="flex flex-col items-center space-y-8 relative">
            <Link href="/">
              <ChevronLeftIcon className="w-6 h-6 absolute top-[-30px] sm:top-5 left-[-50px] sm:left-[-85px] text-white" />
            </Link>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 pr-12  rounded-[4px] input-focus-ring focus-visible:ring-[#FAB01C] transition-all duration-200 ease-in-out peer placeholder-transparent"
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 rounded-[4px] pr-12  input-focus-ring focus-visible:ring-[#FAB01C] transition-all duration-200 ease-in-out peer placeholder-transparen"
                    placeholder="Password"
                    id="password"
                    required
                  />

                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 hover:text-[#FAB01C]" />
                    ) : (
                      <Eye className="h-5 w-5 hover:text-[#FAB01C]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Button disabled={loading} className="w-full hover-scale">
                  Sign in
                </Button>

                <p className="text-gray-600 text-sm sm:text-base">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-[#FAB01C] font-bold underline hover:text-yellow-600"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default Email;
