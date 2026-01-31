import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, ExternalLink, Globe, Lock } from "lucide-react";
import { useContentStore } from "../store/useContentStore";
import ContentRenderer from "../components/ContentRenderer";
import { showToastWarning } from "../components/ToastWarning";
import { formatDate } from "../utils/dateFormat";

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const content = useContentStore((state) =>
    state.contents.find((c) => c._id === id)
  );

  const deleteContent = useContentStore((state) => state.deleteContent);
  const chnageContentVisibility = useContentStore(
    (state) => state.chnageContentVisibility
  );

  if (!content) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Content not found
      </div>
    );
  }

  // delete content
  const handleDelete = () => {
    showToastWarning({
      message: "Are you sure you want to delete this content?",
      onConfirm: async () => {
        await deleteContent(content._id);
        toast.success("Content deleted");
        navigate("/");
      },
    });
  };

  // chnage visibility
  const handleMakePublic = async () => {
    try {
      await chnageContentVisibility(content._id, !content.public);
      toast.success(
        content.public
          ? "Content removed from Brain"
          : "Content added to Brain",
        { position: "top-center" }
      );
    } catch {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-3 overflow-hidden bg-sidebar-50">
      <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">

        {/* left side */}
        <div className="max-w-[280px] h-fit space-y-4 bg-sidebar-50 not-last:border border-gray-200 dark:border-white/10 
        rounded-2xl p-5 hover:shadow-md transition">

          {/* title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {content.title}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Added on {formatDate(content.createdAt)}
            </p>
          </div>

          {/* Embed social */}
          <div className="relative rounded-2xl h-64 overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
            <ContentRenderer type={content.type} link={content.link} />
          </div>

          {/* tags */}
          {content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="
                      text-[11px] font-medium
                      bg-black/60 text-white
                      backdrop-blur-sm
                      px-2 py-0.5 rounded-full
                    "
                >
                  #{tag.tagName}
                </span>
              ))}
            </div>
          )}

          {/* Original link */}
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-sm font-medium text-blue-600
              hover:underline
            "
          >
            <ExternalLink size={15} />
            Open original
          </a>
        </div>

        {/* Right side */}
        <div className="space-y-14">

          {/* Description */}
          <div>
            <h3 className="text-sm sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {content.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-white/10">
            <button
              onClick={handleMakePublic}
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-md text-xs font-medium
                transition
                ${content.public
                  ? "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                  : "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-500/10"
                }
              `}
            >
              {content.public ? <Lock size={14} /> : <Globe size={14} />}
              {content.public ? "Private" : "Make public"}
            </button>

            <button
              onClick={handleDelete}
              className="
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-md text-xs font-medium
                text-red-600 hover:bg-red-50
                dark:text-red-400 dark:hover:bg-red-500/10
                transition
              "
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
