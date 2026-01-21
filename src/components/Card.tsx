// Card.tsx
import { Share2, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  tags: string[];
  addedDate: string;
}

const Card = ({ title, tags, addedDate }: CardProps) => {
  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded-2xl p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-gray-800 leading-tight">{title}</h3>
        <div className="flex gap-2 text-gray-400">
          <button><Share2 size={18} /></button>
          <button><Trash2 size={18} /></button>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
        <div className="text-gray-500 text-sm flex flex-col items-center">
          <span className="text-2xl">📄</span>
          <span>Image not available</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500">Added on {addedDate}</p>
    </div>
  );
};

export default Card;

