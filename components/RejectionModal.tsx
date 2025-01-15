"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RejectionModal = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace("/");
  };

  return (
    <Card className="w-full max-w-md p-8 animate-fade-in-scale bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-red-600">
            Rejected
          </h1>
          <p className="text-sm text-muted-foreground">
            We're sorry, but your submission could not be processed. 😞
          </p>
          <Image
            src="/rejection.png"
            width={180}
            height={180}
            alt="rejection"
            className="mx-auto"
          />
          <p className="text-sm text-muted-foreground">
            Please review the details and try again later.
          </p>
          <p className="text-sm text-muted-foreground">
            If you have any questions, feel free to reach out to support. 💬
          </p>
        </div>
        <button
          onClick={handleGoBack}
          className="bg-red-600 mt-2 px-4 py-2 hover:bg-red-500 text-white rounded transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </Card>
  );
};

export default RejectionModal;
