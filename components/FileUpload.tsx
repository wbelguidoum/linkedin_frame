import React, { useCallback, useState } from 'react';
import type { User } from '../types';

interface FileUploadProps {
  onImageUpload: (dataUrl: string) => void;
  onClose: () => void;
  user: User | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload, onClose, user }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onImageUpload(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleFileChange]);

  const handleUseLinkedInPhoto = () => {
    if (user?.picture) {
      onImageUpload(user.picture);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="file-upload-title"
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl p-8 relative max-w-lg w-full m-4 border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 id="file-upload-title" className="text-2xl font-bold mb-6 text-white">Upload new photo</h2>
        
        {user?.picture ? (
          <div className="space-y-4">
            <button
              onClick={handleUseLinkedInPhoto}
              className="w-full flex items-center text-left p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <img src={user.picture} alt="Your LinkedIn profile" className="w-12 h-12 rounded-full mr-4 object-cover" />
              <div className="flex-grow">
                <span className="font-semibold text-white">Use your LinkedIn Photo</span>
                <p className="text-sm text-slate-400">Import from your profile.</p>
              </div>
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-500">OR</span>
              </div>
            </div>
            <label
              htmlFor="file-upload"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              className={`flex justify-center items-center w-full px-6 py-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${isDragging ? 'border-indigo-400 bg-slate-700/50' : 'border-slate-600 hover:border-indigo-500 hover:bg-slate-700/30'}`}
            >
              <div className="text-center">
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-indigo-400">Upload a different photo</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">or drag and drop</p>
              </div>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
              />
            </label>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={`flex justify-center items-center w-full px-6 py-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
              ${isDragging ? 'border-indigo-400 bg-slate-700/50' : 'border-slate-600 hover:border-indigo-500 hover:bg-slate-700/30'}`}
          >
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUpload;