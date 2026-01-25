import { apiClient } from "./apiClient";


export interface LoginResponse {
    user: {
        id: string;
        email: string;
    },
    token: string;
}

export const loginApi = async (email: string, password: string,type:string): Promise<LoginResponse> => {
    try {
        const res = await apiClient.post( type === "login" ? "/auth/login": "/auth/signup", {
            email,
            password,
        });

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


