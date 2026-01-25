import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentSchema } from "../schemas/contentSchema";
import type { ContentFormData } from "../schemas/contentSchema";
import Input from "./ui/Input";
import TagInput from "./TagInput";
import secondBrainImg from "../assets/second_brain_image.png";
import { CrossIcon } from "../icons/CrossIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const CreateContent = ({ open, onClose }: IProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid,isSubmitting },
  } = useForm<ContentFormData>({
    resolver: zodResolver(ContentSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      link: "",
      description: "",
      tags: [],
    },
  });

  const onSubmit = async (data: ContentFormData) => {
   
    try {
      console.log(data);
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  const handleTagChange = (updatedTags: string[]) => {
    setTags(updatedTags);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 shadow-2xl p-6 md:p-10 transition-all">

        {/* Close Button */}
        <button
          onClick={() => {
            reset();
            setTags([]);
            onClose();
          }}
          className="absolute top-5 right-5 rounded-full p-2 cursor-pointer bg-slate-200 dark:bg-slate-700 hover:scale-110 transition"
        >
          <CrossIcon />
        </button>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
          Create New Content
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 relative"
          >
            {/* Title */}
            <div>
              <label htmlFor="title" className="font-medium text-slate-700 dark:text-slate-200">
                Title *
              </label>
             <Input id="title" type={"text"}
             placeholder="Add Title"
             {...register("title")}
             />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Link */}
            <div>
              <label htmlFor="link" className="font-medium text-slate-700 dark:text-slate-200">
                Link *
              </label>
              <Input id="link"
              className=""
                placeholder="Add Link"
                {...register("link")}
              />
              {errors.link && (
                <p className="text-red-500 text-sm">{errors.link.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="font-medium text-slate-700 dark:text-slate-200">
                Description *
              </label>
              <textarea id="description"
                {...register("description")}
                placeholder="Add Description"
                className="w-full rounded-xl border px-4 py-3 bg-transparent dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="font-medium text-slate-700 dark:text-slate-200">
                Tags (Max 3) *
              </label>
              <TagInput tags={tags} setTags={handleTagChange} />
              {errors.tags && (
                <p className="text-red-500 text-sm mt-2">{errors.tags.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold text-white transition
                ${!isValid || isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"}
              `}
            >
              {isSubmitting ? "Saving..." : "Create Content"}
            </button>
          </form>

          {/* Image */}
          <div className="hidden md:flex justify-center">
            <img
              src={secondBrainImg}
              alt="Second Brain"
              className="max-h-80 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
