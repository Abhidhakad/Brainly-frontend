// import { AxiosError } from "axios";
import { apiClient } from "./apiClient";
import { handleApiError } from "../utils/handleApiError";

export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}



export const loginApi = async (
  email: string,
  password: string,
  type: string
): Promise<LoginResponse> => {
  try {
    const res = await apiClient.post(
      type === "login" ? "/auth/login" : "/auth/signup",
      { email, password }
    );

    return res.data;
  } catch (error: unknown) {
    handleApiError(error,"something went wrong.");
    throw error;
  }
};
