"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SubmissionSuccessModal = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace("/");
  };

  return (
    <Card className="w-full max-w-md p-8 animate-fade-in-scale bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Thank you for joining us!
          </h1>
          <p className="text-sm text-muted-foreground">
            Your submission has been successfully received.
          </p>
          <Image
            src="/success.png"
            width={300}
            height={300}
            alt="success"
            className="mx-auto"
          />
          <p className="text-sm text-muted-foreground">
            Our team will review your information and contact you within 72
            hours.
          </p>
          <p className="text-sm text-muted-foreground">
            We&apos;re excited to have you on board!
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

export default SubmissionSuccessModal;
