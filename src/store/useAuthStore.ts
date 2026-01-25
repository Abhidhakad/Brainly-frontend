import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi } from "../api/authApi";
import { type LoginResponse } from "../api/authApi";

interface AuthState {
  user: LoginResponse["user"] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string, type: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password, type) => {
        try {
          set({ isLoading: true, error: null });

          const { user, token } = await loginApi(email, password, type);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

        } catch (err: unknown) {
          let message = "Login failed";

          if (err instanceof Error) {
            message = err.message;
          }
          set({ error: message });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

    }),
    {
      name: "auth-storage",
    }
  )
);
