import axiosApiInstance from "@/api/base-api";
import { deleteCookie } from "./cookie";

interface ILoginRequest {
  username: string;
  password: string;
}

interface IAuthResponse {
  accessToken: string;
}

export const signInAdmin = async <T = ILoginRequest>(
  authData: T
): Promise<IAuthResponse> => {
  try {
    const response = await axiosApiInstance.post("/auth/login", authData);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};

export const logoutAdmin = async (): Promise<void> => {
  try {
    await deleteCookie("accessToken");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePassword = async <T = IChangePasswordRequest>(
  changePassData: T
): Promise<void> => {
  try {
    await axiosApiInstance.post("/auth/change-password", changePassData);
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 404)
      throw new Error("Current password in not correct");
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};

export enum RegisteredBy {
  GOOGLE = "google",
  EMAIL = "email",
}

interface IUserLoginRequest {
  email: string;
  password: string;
  registeredBy: RegisteredBy;
}

export const signInUser = async <T = IUserLoginRequest>(
  authData: T
): Promise<void> => {
  try {
    const response = await axiosApiInstance.post("/personal-data/", authData);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
