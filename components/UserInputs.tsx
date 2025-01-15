import Link from "next/link";
import { Card } from "./ui/card";
import { ChevronLeftIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import SubmissionSuccessModal from "./SubmissionSuccessModal";
import { updateUser } from "@/actions/user";

interface UserInputProps {
  id: number;
}

const UserInputs: React.FC<UserInputProps> = ({ id }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mcNumber, setMcNumber] = useState<number>(0);
  const [dot, setDot] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(id, {
        firstName,
        lastName,
        companyName,
        mcNumber,
        dot,
      });
      setShowModal(true);
    } catch (error) {
    } finally {
      setFirstName("");
      setLastName("");
      setCompanyName("");
      setMcNumber(0);
      setDot(0);
      setLoading(false);
    }
  };

  return (
    <>
      {showModal ? (
        <SubmissionSuccessModal />
      ) : (
        <Card className="max-w-md w-full p-12 pt-5 animate-fade-in-scale relative z-10 mt-5 sm:mt-0">
          <div className="flex flex-col items-center space-y-7 relative">
            <Link href="/">
              <ChevronLeftIcon className="w-6 h-6 absolute top-[-82px] sm:top-0 left-[-50px] sm:left-[-85px] text-white" />
            </Link>

            <form className="w-full space-y-2.5" onSubmit={handleSubmit}>
              <div className="flex flex-col items-start">
                <label htmlFor="firstName" className="text-gray-500">
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-12 px-4"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="lastName" className="text-gray-500">
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastName"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-12 px-4"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="companyName" className="text-gray-500">
                  Company Name
                </label>
                <Input
                  type="text"
                  id="companyName"
                  value={companyName}
                  required
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-12 px-4"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="mcNumber" className="text-gray-500">
                  MC Number
                </label>
                <Input
                  type="number"
                  id="mcNumber"
                  value={mcNumber}
                  required
                  onChange={(e) => setMcNumber(Number(e.target.value))}
                  className="w-full h-12 px-4"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="dot" className="text-gray-500">
                  DOT Number
                </label>
                <Input
                  type="number"
                  id="dot"
                  value={dot}
                  required
                  onChange={(e) => setDot(Number(e.target.value))}
                  className="w-full h-12 px-4"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  disabled={loading}
                  className="bg-[#FAB01C] hover:bg-yellow-600 text-white px-6 py-2 rounded transition-colors duration-200 mt-5"
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default UserInputs;
