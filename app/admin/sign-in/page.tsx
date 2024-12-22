"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";

const SignIn = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await auth.signIn({
        username: username,
        password: password,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full gradient-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent" />
      </div>

      <div className="container max-w-[420px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 space-y-6"
        >
          <div className="space-y-1.5 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 mx-auto mb-5"
            >
              <Image
                src="/van-animated.png"
                width={150}
                height={150}
                alt="Delivery Van"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="username"
                placeholder="Your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 focus-visible:ring-[#C350D3]"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 focus-visible:ring-[#C350D3]"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 hover:text-[#C350D3]" />
                  ) : (
                    <Eye className="h-5 w-5 hover:text-[#C350D3]" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="pt-4">
            <p className="text-xs text-center text-muted-foreground">
              Secure access to your dashboard
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
