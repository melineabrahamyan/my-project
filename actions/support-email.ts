import axiosApiInstance from "@/api/base-api";

export const getSupportEmail = async () => {
  try {
    const response = await axiosApiInstance.get("/support-email");
    return response.data.supportEmail;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};

export const changeSupportEmail = async (supportEmail: string) => {
  try {
    const response = await axiosApiInstance.put("/support-email", {
      supportEmail,
    });
    return response.data.supportEmail;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
