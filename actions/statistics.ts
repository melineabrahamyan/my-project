import axiosApiInstance from "@/api/base-api";
import axios from "axios";

export const sendUserIPAddress = async () => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_IPIFY_API!);
    const userIP = response.data.ip;
    await axiosApiInstance.post("/ip-address", {
      ip: userIP,
    });
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
