"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { changePassword } from "@/actions/auth";

const PasswordField = ({
  label,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
  id,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  id: string;
}) => (
  <div className="space-y-1.5">
    <p className="text-start text-sm font-semibold">{label}</p>
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 pr-12 input-focus-ring transition-all duration-200 ease-in-out focus-visible:ring-email"
        id={id}
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
);

const ChangePassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword((prev) => !prev);
  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleNaviateDashboard = () => {
    router.push("/admin/dashboard");
  };

  const handleSave = async () => {
    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (trimmedNewPassword === trimmedCurrentPassword) {
      return toast({
        title: "Password Change Error",
        description: "New password cannot be the same as the current password.",
        variant: "destructive",
      });
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      return toast({
        title: "Password Change Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      toast({
        title: "Success!",
        description: "Password Changed Successfully",
        duration: 3000,
      });
      handleNaviateDashboard();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-[100vh] h-full p-6 sm:p-10 w-full">
      <div className="max-w-xl mx-auto animate-fadeIn pt-24">
        <div className="bg-white space-y-3 bg-opacity-70 backdrop-blur-lg border border-white border-opacity-20 shadow-lg rounded-xl p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
            Change Password
          </h1>

          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            showPassword={showCurrentPassword}
            toggleShowPassword={toggleShowCurrentPassword}
            id="currentPassword"
          />

          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            showPassword={showNewPassword}
            toggleShowPassword={toggleShowNewPassword}
            id="newPassword"
          />

          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={showConfirmPassword}
            toggleShowPassword={toggleShowConfirmPassword}
            id="confirmPassword"
          />

          <div className="flex items-center justify-between w-full gap-2">
            <Button
              onClick={handleNaviateDashboard}
              variant="secondary"
              type="submit"
              className="w-full hover-scale border border-gray-200"
            >
              Cancel
            </Button>
            <Button
              disabled={
                !confirmPassword.trim() ||
                !newPassword.trim() ||
                !currentPassword.trim()
              }
              onClick={handleSave}
              type="submit"
              className="w-full hover-scale"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
