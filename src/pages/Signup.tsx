import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { signupSchema } from "../schemas/authSchema";
import { useAuthStore } from "../store/useAuthStore";

type AuthFormData = z.infer<typeof signupSchema>;

const Login = () => {
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
    formState: { errors, isSubmitting},
  } = useForm<AuthFormData>({
    resolver: zodResolver(signupSchema),
  });

  
  const onSubmit = async (data: AuthFormData) => {
    try {
      await login(data.username,data.password,"signup");
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(
      error instanceof Error
        ? error.message
        : "Login failed. Please try again."
    );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Sign-up
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Username */}
          <Input
            type="text"
            placeholder="Enter Username"
            autoComplete="username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">
              {errors.username.message}
            </p>
          )}

          {/* Password */}
          <Input
            type="password"
            placeholder="Enter Password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

          <Button
            title={isSubmitting || isLoading ? "Signing in..." : "Sign In"}
            size="md"
            varient="primary"
            disabled={isSubmitting || isLoading}
          />
        </form>

        <p className="text-center text-sm mt-4">
          already have account?{" "}
          <a
            href="/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
