"use client";

import { cn } from "@/lib/utils";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  label?: string;
  hint?: string;
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    "application/pdf": [".pdf"],
  },
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024,
  label,
  hint,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesSelected(newFiles);
    },
    [files, maxFiles, onFilesSelected]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    maxSize,
  });

  return (
    <div className={cn("space-y-3", className)}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive
            ? "border-brand-500 bg-brand-50"
            : "border-gray-300 hover:border-brand-400 hover:bg-gray-50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
        <p className="text-sm font-medium text-gray-700">
          {isDragActive ? "Drop files here..." : "Drag & drop files, or click to browse"}
        </p>
        {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              {file.type.startsWith("image/") ? (
                <ImageIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
              ) : (
                <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
              <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</span>
              <button
                onClick={() => removeFile(index)}
                className="p-1 rounded hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
