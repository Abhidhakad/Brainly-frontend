import { z } from "zod";


export const SignupSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username can`t be longer than 20 chracters"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password can't be longer than 50 characters"),

})
