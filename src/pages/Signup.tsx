import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { signupSchema } from "../schemas/authSchema";
import { useAuthStore } from "../store/useAuthStore";

type AuthFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      await login(data.username, data.password, "signup");

      toast.success("Account created successfully!", {
        position: "top-center",
      });

      navigate("/", { replace: true });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again.";

      toast.error(message, {
        position: "top-center",
      });

      // ✅ Clear fields on error
      reset({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-blue-100 to-blue-200
      dark:from-gray-900 dark:to-gray-800"
    >
      <div
        className="w-full max-w-md rounded-2xl p-8
        bg-white dark:bg-gray-900
        shadow-xl dark:shadow-black/40
        border border-gray-200 dark:border-gray-700"
      >
        <h2
          className="text-3xl font-bold text-center mb-6
          text-blue-700 dark:text-blue-400"
        >
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Username */}
          <div>
            <Input
              type="text"
              placeholder="Enter Username"
              autoComplete="username"
              {...register("username")}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Create Password"
              autoComplete="new-password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            title={isSubmitting || isLoading ? "Signing up..." : "Sign Up"}
            size="md"
            varient="primary"
            disabled={isSubmitting || isLoading}
          />
        </form>

        <p
          className="text-center text-sm mt-6
          text-gray-600 dark:text-gray-400"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 dark:text-blue-400
            hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
