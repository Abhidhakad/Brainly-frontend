import { useState } from "react";
import Input from "./ui/Input";

interface TagInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
}


const TagInput = ({ tags, setTags }: TagInputProps) => {
    const [input, setInput] = useState("");

    const addTag = () => {
        const newTag = input.trim();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
        }
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            addTag();
        } else if (e.key === "Backspace" && input === "") {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full p-1 flex flex-wrap items-center gap-2 relative">
            <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type tag and press Enter"
                className="w-full px-2 py-2 border text-center border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 text-base"
            
            />
            <div className="mt-5 flex gap-2 flex-wrap justify-center items-center absolute top-7">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-red-600"
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
