import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentSchema } from "../schemas/ContentSchema";
import type { ContentFormData } from "../schemas/ContentSchema";
import Input from "./ui/Input";
import TagInput from "./TagInput";
import secondBrainImg from "../assets/second_brain_image.png";
import { CrossIcon } from "../icons/CrossIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../helpers/apiConnetor";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const CreateContent = ({ open, onClose }: IProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
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
    setLoading(true);
    try {
      const response = await apiConnector({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/create`,
        bodyData: data,
        withCredentials: true
      });
      console.log(response);
      toast.success("Signed up successfully!");
      console.log("Signup response", response);
      navigate("/");

    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error("Signup failed:", error);
      toast.error(err?.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

    // Update `tags` in RHF when custom TagInput changes
    const handleTagChange = (updatedTags: string[]) => {
      setTags(updatedTags);
      setValue("tags", updatedTags, { shouldValidate: true });
    };

    if (!open) return null;

    return (
      <div className="fixed inset-0 md:top-6 md:bottom-8 md:left-60 md:right-10 z-50 flex items-center justify-center bg-opacity-60 backdrop-blur-sm px-4">
        <div className="w-full max-w-4xl bg-slate-100 rounded-2xl shadow-2xl p-6 space-y-6 relative overflow-y-auto max-h-[90vh]">
          <span
            className="absolute right-10 font-bold text-blue-700 cursor-pointer bg-blue-200 rounded-full p-1 hover:bg-blue-300 transition-all"
            onClick={() => {
              reset();
              onClose();
              setTags([]);
            }}
          >
            <CrossIcon />
          </span>
          <h2 className="text-2xl font-bold text-center text-blue-700">Create New Content</h2>

          <div className="flex flex-col-reverse justify-center items-center md:flex-row gap-8 ">
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:pl-48 md:w-1/2 space-y-2">
              {/* Title */}
              <div>
                <label htmlFor="title" className="font-semibold block mb-1">
                  Add Title <span className="text-blue-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Add Title"
                  className="w-full px-2 py-2 border text-center border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Link */}
              <div>
                <label htmlFor="link" className="font-semibold block mb-1">
                  Add Link <span className="text-blue-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Add Link"
                  className="w-full px-2 py-2 border text-center border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  {...register("link")}
                />
                {errors.link && (
                  <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="font-semibold block mb-1">
                  Add Description <span className="text-blue-500">*</span>
                </label>
                <textarea
                  placeholder="Add Description"
                  {...register("description")}
                  className="md:w-[97%] sm:w-[60%] w-[87%] text-center px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="font-semibold block mb-1">
                  Add Tags (Max-3)
                  <span className="text-blue-500">*</span>
                </label>
                <div >
                  <TagInput tags={tags} setTags={handleTagChange} />
                </div>
                {errors.tags && (
                  <p className="text-red-500 text-sm mt-8">{errors.tags.message}</p>
                )}
              </div>


              <div className="flex justify-center pt-7">
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className={`px-4 py-2 text-white rounded-lg transition ${!isValid ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {loading ? "loading..":"Submit"}
                </button>
              </div>
            </form>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                loading="lazy"
                src={secondBrainImg}
                alt="brain_image"
                className="w-full md:max-h-80 sm:h-64  object-contain sm:pt-0"
              />
            </div>

          </div>
        </div>
      </div>
    );
  };

  export default CreateContent;
