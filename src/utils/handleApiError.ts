import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
}

export const handleApiError = (
  error: unknown,
  fallbackMessage: string
): never => {
  if (error instanceof AxiosError) {
    const apiMessage =
      (error.response?.data as ApiErrorResponse)?.message;

    throw new Error(apiMessage || fallbackMessage);
  }

  throw new Error("Something went wrong");
};
