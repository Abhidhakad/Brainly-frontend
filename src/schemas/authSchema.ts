import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "Username is required")
        .max(30, "Username can`t be longer than 20 chracters"),
    password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
    username: z.string().min(1, "Username is required")
        .max(30, "Username can`t be longer than 20 chracters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Must contain uppercase letter")
        .regex(/[a-z]/, "Must contain lowercase letter")
        .regex(/[^a-zA-Z0-9]/, "Must contain special character"),
});

