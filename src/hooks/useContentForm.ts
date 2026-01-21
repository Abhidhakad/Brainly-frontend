
import { useState } from "react";
import { ContentSchema } from "../schemas/ContentSchema";
import type { ContentFormData } from "../schemas/ContentSchema";

export const useContentForm = () => {
    const [formData, setFormData] = useState<ContentFormData>({
        title: "",
        link: "",
        description: "",
        tags: [],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isDisabled, setIsDisabled] = useState(true);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = ContentSchema.safeParse(formData);
            console.log(result.success);
            // setIsDisabled(!result.success);
            if (!result.success) {
                const errorMap: Record<string, string> = {};
                result.error.errors.forEach((e) => {
                    errorMap[e.path[0] as string] = e.message;
                });
                setErrors(errorMap);
            } else {
                setErrors({});
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return { formData, handleChange, errors, isDisabled,handleFormSubmit};
};
