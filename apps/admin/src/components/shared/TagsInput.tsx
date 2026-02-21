import React, { useState } from "react";

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}
const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmed = inputValue.trim();

    // When user presses comma or enter
    if ((e.key === "Enter" || e.key === ",") && trimmed) {
      e.preventDefault();

      if (!tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }

      setInputValue("");
    }

    // Backspace when input is empty removes last tag
    if (e.key === "Backspace" && !inputValue && tags.length) {
      e.preventDefault();
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tags
      </label>
      <div className="flex flex-wrap gap-2 border border-gray-300 p-2 rounded-lg">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow min-w-[100px] border-none focus:outline-none focus:ring-0"
          placeholder="Type and press Enter or ,"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagsInput;
