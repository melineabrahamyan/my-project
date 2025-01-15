import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { changeSupportEmail, getSupportEmail } from "@/actions/support-email";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EditSupportEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmail = async () => {
      const supportEmail = await getSupportEmail();
      setEmail(supportEmail);
    };

    fetchEmail();
  }, []);

  const handleNaviateDashboard = () => {
    router.push("/admin/dashboard");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newEmail.trim() === email.trim()) {
      return toast({
        title: "Support Email Change Error",
        description: "New email cannot be the same as the current email.",
        variant: "destructive",
      });
    }

    try {
      await changeSupportEmail(newEmail);
      toast({
        title: "Success!",
        description: "Support Email Changed Successfully",
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
    <div className="bg-white space-y-3 bg-opacity-70 backdrop-blur-lg border border-white border-opacity-20 shadow-lg rounded-xl p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">
        Change Support Email
      </h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <p className="text-start text-sm font-semibold">New Email</p>
        <Input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full h-12 px-4 pr-12 input-focus-ring transition-all duration-200 ease-in-out focus-visible:ring-email"
          id="newEmail"
        />

        <div className="flex items-center justify-between w-full gap-2">
          <Button
            onClick={handleNaviateDashboard}
            variant="secondary"
            type="button"
            className="w-full hover-scale border border-gray-200"
          >
            Cancel
          </Button>
          <Button
            disabled={!newEmail.trim()}
            type="submit"
            className="w-full hover-scale"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSupportEmail;
