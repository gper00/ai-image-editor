
import React, { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  onImageUpload: (base64: string, mimeType: string) => void;
}

const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);


const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      setError(null);
      onImageUpload(base64String, file.type);
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        // Manually trigger change event
        const changeEvent = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(changeEvent);
      }
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-banana transition-colors duration-300"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-md" />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <UploadIcon className="w-12 h-12 mb-2" />
            <p className="font-semibold">Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default ImageUpload;
