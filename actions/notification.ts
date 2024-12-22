import axiosApiInstance from "@/api/base-api";

interface IEmailRequest {
  from: {
    name: string;
  };
  to: string;
  subject: string;
  html: String;
}

export const sendEmailNotification = async <T = IEmailRequest>(
  emailData: T
): Promise<boolean> => {
  try {
    const response = await axiosApiInstance.post(
      "/notification/send-email",
      emailData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
