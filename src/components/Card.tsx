import { Share2, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  tags: string[];
  addedDate: string;
}

const Card = ({ title, tags, addedDate }: CardProps) => {
  return (
    <div
      className="
        group
        w-full
        sm:w-[280px]
        md:w-[300px]
        lg:w-[280px]
        bg-sidebar-50
        shadow-md
        rounded-2xl
        p-4
        space-y-4
        flex-shrink-0
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-xl
        dark:hover:shadow-black/40
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight line-clamp-2">
          {title}
        </h3>

        <div className="flex gap-2 text-gray-400">
          <button
            className="
              p-1 rounded-md
              transition
              hover:text-gray-700
              dark:hover:text-gray-200
              hover:bg-black/5
              dark:hover:bg-white/10
            "
          >
            <Share2 size={18} />
          </button>

          <button
            className="
              p-1 rounded-md
              transition
              hover:text-red-500
              hover:bg-red-500/10
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Image Placeholder */}
      <div
        className="
          w-full h-32
          bg-gray-200
          rounded-md
          flex items-center justify-center
          overflow-hidden
        "
      >
        <div
          className="
            text-gray-500 text-sm
            flex flex-col items-center
            transition-transform duration-300
            group-hover:scale-105
          "
        >
          <span className="text-2xl">📄</span>
          <span>Image not available</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="
              text-xs
              bg-blue-100
              text-blue-600
              font-medium
              px-2 py-0.5
              rounded-md
              transition
              hover:bg-blue-200
            "
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Date */}
      <p className="text-xs font-semibold text-gray-500">
        Added on {addedDate}
      </p>
    </div>
  );
};

export default Card;
