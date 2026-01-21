import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { z } from "zod";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { SignupSchema } from "../schemas/SignupSchema";
import { apiConnector } from "../helpers/apiConnetor";
import { AxiosError } from "axios";

type AuthFormData = z.infer<typeof SignupSchema>;
const Login = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const result = SignupSchema.safeParse(updatedData);
    if (!result.success) {
      const fieldErrors: Partial<AuthFormData> = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof AuthFormData;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }

    const hasEmptyFields = Object.values(updatedData).some((val) => val.trim() === "");
    setDisableSubmit(hasEmptyFields || !result.success);
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiConnector({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/login`,
        bodyData: formData,
        withCredentials: true
      });

      toast.success("Logged in successfully!");
      console.log("Login response", response);
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error("Login failed:", error);
      toast.error(err?.response?.data?.message||"Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>
        <form onSubmit={formHandler} className="flex flex-col gap-4">
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={changeHandler}
            placeholder="Enter Username"
            autoComplete="username"
            className="text-center"
            required
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Password"
            autoComplete="current-password"
            className="text-center"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <Button
            title={isSubmitting ? "Logging in..." : "Login"}
            size="md"
            varient="primary"
            disabled={disableSubmit || isSubmitting}
          />
        </form>

        <p className="text-center text-sm mt-4">
          New here?{" "}
          <span className="text-blue-600 underline hover:text-blue-800">
            <a href="/signup">Signup</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
