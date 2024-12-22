import axiosApiInstance from "@/api/base-api";

export const checkUserExistence = async (email: string): Promise<boolean> => {
  try {
    const response = await axiosApiInstance.post(
      "/personal-data/check-existence",
      { email }
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
  name: string | null;
  registeredBy: string;
  email: string;
  password: string;
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
  take: number
): Promise<GetAllUsersResponse> => {
  try {
    const response = await axiosApiInstance.get<GetAllUsersResponse>(
      "/personal-data",
      {
        params: {
          page,
          take,
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
