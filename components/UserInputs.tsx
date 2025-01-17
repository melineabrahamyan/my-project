import Link from "next/link";
import { Card } from "./ui/card";
import { ChevronLeftIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import SubmissionSuccessModal from "./SubmissionSuccessModal";
import { updateUser } from "@/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface UserInputProps {
  id: number;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  mcNumber: z
    .string()
    .min(6, "MC number must be at least 6 characters")
    .max(8, "MC number must not exceed 8 characters")
    .refine(
      (val) => !isNaN(Number(val)) && !val.includes("e") && !val.includes("E"),
      { message: "Please enter a valid MC number" }
    )
    .refine((val) => Number(val) > 0, {
      message: "MC number must be positive",
    }),
  dot: z
    .string()
    .min(5, "DOT number must be at least 5 characters")
    .max(7, "DOT number must not exceed 7 characters")
    .refine(
      (val) => !isNaN(Number(val)) && !val.includes("e") && !val.includes("E"),
      { message: "Please enter a valid DOT number" }
    )
    .refine((val) => Number(val) > 0, {
      message: "DOT number must be positive",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const UserInputs: React.FC<UserInputProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      mcNumber: "",
      dot: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await updateUser(id, {
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        mcNumber: Number(data.mcNumber),
        dot: Number(data.dot),
      });
      setShowModal(true);
      form.reset();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
      e.preventDefault();
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

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full space-y-2.5"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-500">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full h-12 px-4"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-500">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full h-12 px-4"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-500">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full h-12 px-4"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mcNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-500">MC Number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onKeyDown={handleKeyDown}
                          className="w-full h-12 px-4"
                          {...field}
                          required
                          min={1}
                          minLength={6}
                          maxLength={8}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dot"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-500">
                        DOT Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onKeyDown={handleKeyDown}
                          className="w-full h-12 px-4"
                          {...field}
                          required
                          min={1}
                          minLength={5}
                          maxLength={7}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#FAB01C] hover:bg-yellow-600 text-white px-6 py-2 rounded transition-colors duration-200 mt-5"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      )}
    </>
  );
};

export default UserInputs;
