import { useState } from "react";
import Input from "./ui/Input";
import { useTagStore } from "../store/useTagStore";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [input, setInput] = useState("");
  const { searchTag, tags: suggestions } = useTagStore();

  const addTag = (value: string) => {
    const newTag = value.trim();
    if (!newTag) return;
    if (tags.includes(newTag)) return;
    if (tags.length >= 3) return;

    setTags([...tags, newTag]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    }

    if (e.key === "Backspace" && input === "") {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const showSuggestions =
    input.length > 0 && suggestions.length > 0 && tags.length < 3;

  return (
    <div className="relative w-full">
      {/* Input */}
      <Input
        disabled={tags.length === 3}
        type="text"
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
          searchTag(value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={
          tags.length === 3
            ? "Maximum 3 tags allowed"
            : "Type tag name and press Enter"
        }
        className={`w-full px-3 py-2 rounded-xl border
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            tags.length === 3
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white dark:bg-gray-900"
          }
        `}
      />

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div
          className="absolute z-20 mt-2 w-full max-h-40 overflow-y-auto
          rounded-xl border bg-white dark:bg-gray-900
          shadow-lg dark:border-gray-700"
        >
          {suggestions.map((tag) => (
            <button
              key={tag._id}
              type="button"
              onClick={() => addTag(tag?.tagName)}
              className="w-full text-left px-4 py-2 text-sm
                hover:bg-blue-50 dark:hover:bg-gray-800
                text-gray-700 dark:text-gray-200
                transition-colors"
            >
              #{tag?.tagName}
            </button>
          ))}
        </div>
      )}

      {/* Selected tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-2 rounded-full
              bg-blue-100 text-blue-700
              dark:bg-blue-900/40 dark:text-blue-300
              px-3 py-1 text-sm"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="w-4 h-4 flex items-center justify-center
                rounded-full text-xs font-bold
                bg-blue-200 text-blue-800
                hover:bg-red-500 hover:text-white
                dark:bg-slate-700 dark:text-slate-300
                dark:hover:bg-red-600
                transition"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
