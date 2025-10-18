
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(dragging);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      handleDragEvents(e, false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onImageUpload(e.dataTransfer.files[0]);
        e.dataTransfer.clearData();
      }
  }, [onImageUpload]);

  return (
    <div className="w-full max-w-2xl text-center">
        <div 
            className={`relative w-full p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging ? 'border-brand-purple bg-brand-light' : 'border-gray-300 bg-white hover:border-gray-400'}`}
            onDragEnter={(e) => handleDragEvents(e, true)}
            onDragLeave={(e) => handleDragEvents(e, false)}
            onDragOver={(e) => handleDragEvents(e, true)}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                disabled={isProcessing}
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center space-y-4 cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 bg-brand-light rounded-full">
                  <UploadIcon className="w-8 h-8 text-brand-purple"/>
                </div>
                <p className="text-xl font-semibold text-gray-700">
                    <span className="text-brand-purple">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500">PNG, JPG or WEBP (max 10MB)</p>
            </label>
        </div>
    </div>
  );
};

export default ImageUploader;
