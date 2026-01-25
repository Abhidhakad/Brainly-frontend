import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * =========================
 * REQUEST INTERCEPTOR
 * =========================
 * Runs BEFORE every API request
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const raw = localStorage.getItem("auth-storage");

    if (raw) {
      const token = JSON.parse(raw)?.state?.token;

      if (token) {
        // Axios v1 guarantees headers exist internally
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * =========================
 * RESPONSE INTERCEPTOR
 * =========================
 * Runs AFTER every API response
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    //  Do NOT redirect for login/signup
    const isAuthRoute =
      requestUrl?.includes("/login") ||
      requestUrl?.includes("/signup");

    if (status === 401 && !isAuthRoute) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export { apiClient };
