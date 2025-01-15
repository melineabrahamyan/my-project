import axiosApiInstance from "@/api/base-api";

export const checkUserExistence = async (email: string): Promise<Date> => {
  try {
    const response = await axiosApiInstance.post(
      "/personal-data/check-existence",
      { email }
    );
    return response.data.createdAt;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};

interface IUpdateUser {
  firstName: string;
  lastName: string;
  companyName: string;
  mcNumber: number;
  dot: number;
}

export const updateUser = async (
  id: number,
  userData: IUpdateUser
): Promise<boolean> => {
  try {
    const response = await axiosApiInstance.put(
      `/personal-data/${id}`,
      userData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};

export interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  registeredBy: string;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  companyName: string | null;
  mcNumber: number | null;
  dot: number | null;
}

export interface IMeta {
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetAllUsersResponse {
  data: IUser[];
  meta: IMeta;
}

export const getAllUsers = async (
  page: number,
  take: number,
  order: "ASC" | "DESC"
): Promise<GetAllUsersResponse> => {
  try {
    const response = await axiosApiInstance.get<GetAllUsersResponse>(
      "/personal-data",
      {
        params: {
          page,
          take,
          order,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
