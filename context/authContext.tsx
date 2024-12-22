"use client";

import React, { createContext, useContext } from "react";
import { setCookie } from "cookies-next";
import { signInAdmin } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AuthContextType {
  signIn: (payload: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const router = useRouter();
  const setTokens = (response: any) => {
    const { success, accessToken } = response;

    if (success) {
      setCookie("accessToken", accessToken, {
        secure: true,
        sameSite: "strict",
      });

      router.push("/admin/dashboard");
    }
  };

  const signIn = async (payload: any) => {
    try {
      const response = await signInAdmin(payload);
      setTokens(response);
      toast({
        title: "Success!",
        description: "Welcome back!",
        duration: 3000,
      });
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred during sign-up";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        duration: 3000,
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
