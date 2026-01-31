import { Share2, Trash2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContentStore } from "../store/useContentStore";
import { type Tag } from "../api/contentApi";
import { showToastWarning } from "./ToastWarning";
import ContentRenderer from "./ContentRenderer";
import { truncateWords } from "../utils/truncateWords";
import { recognizeIcon } from "../utils/recognizeIcon";

interface CardProps {
  _id: string;
  title: string;
  tags: Tag[];
  addedDate: string;
  type: string;
  link: string;
  descrption: string
}

const Card = ({ _id, title, tags, addedDate, type, link, descrption }: CardProps) => {
  const navigate = useNavigate();
  const deleteContent = useContentStore((state) => state.deleteContent);

  const deleteContentHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    showToastWarning({
      message: "Are you sure you want to delete this content?",
      onConfirm: async () => {
        await deleteContent(_id);
        toast.success("Content deleted", { position: "top-center" });
      },
    });
  };

  return (
    <div className="group w-full min-w-[280px] bg-sidebar-50 shadow-md rounded-2xl p-4 space-y-4
    transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl
    dark:hover:shadow-black/40 border border-transparent">

      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-2">
          <span className="text-gray-500">{recognizeIcon(type)}</span>
          <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-snug line-clamp-2 break-words">
            {title}
          </h3>
        </div>

        <div className="flex gap-2 text-gray-500">
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1 rounded-md transition hover:text-gray-700 hover:bg-black/5">
            <Share2 size={18} />
          </button>

          <button
            onClick={deleteContentHandler}
            className="p-1 rounded-md transition hover:text-red-500 hover:bg-red-500/10">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Content Preview */}
      <div
        className="
         w-full h-40 sm:h-44
          mt-3 overflow-hidden rounded-lg
          bg-gray-100 dark:bg-zinc-800
          flex items-center justify-center
          pointer-events-none
        "
      >
        <ContentRenderer type={type} link={link} />
      </div>

      {/* description  */}
      <div>
        <p className="text-sm font-semibold dark:text-gray-300 text-gray-600">
          {truncateWords(descrption, 15)}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag._id}
            className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md"
          >
            #{tag.tagName}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs font-semibold text-gray-500">
          Added on {addedDate}
        </p>

        {/* View details button */}
        <button
          onClick={() => navigate(`/content/${_id}`)}
          className="
            flex items-center gap-1
            text-sm font-medium text-blue-600
            hover:underline
          "
        >
          View details
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Card;

