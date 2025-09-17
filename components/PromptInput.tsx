
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="e.g., 'Add a party hat on the cat' or 'Make the background a galaxy'"
      rows={4}
      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-banana transition-colors duration-300"
    />
  );
};

export default PromptInput;
