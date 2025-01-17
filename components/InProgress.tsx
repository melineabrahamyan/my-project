"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InProgress = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace("/");
  };

  return (
    <Card className="w-full max-w-md p-8 animate-fade-in-scale bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Signup in Progress
          </h1>
          <p className="text-sm text-muted-foreground">
            Your previous submission is still being reviewed. Please hold
            tight—our team is working on it and will contact you soon.
          </p>
          <Image
            src="/progress.png"
            width={250}
            height={250}
            alt="progress"
            className="mx-auto"
          />
          <p className="text-sm text-muted-foreground">
            Thank you for your patience!
          </p>
        </div>
        <button
          onClick={handleGoBack}
          className="bg-google-blue mt-2 px-4 py-2 hover:bg-google-blue/90 text-white  rounded transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </Card>
  );
};

export default InProgress;
