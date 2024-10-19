"use client";

import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Dropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    setFileCount(droppedFiles.length);
    // Here you can handle the dropped files, e.g., upload them to a server
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileCount(e.target.files.length);
      // Here you can handle the selected files, e.g., upload them to a server
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFileDialog();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      className={`w-full max-w-md cursor-pointer p-8 text-center transition-colors duration-200 ${
        isDragging ? "border-primary" : "border-2 border-dashed border-gray-300"
      } hover:border-primary focus:border-primary focus:outline-none`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
      onKeyDown={handleKeyDown}
      aria-label="Click or drag and drop to upload files"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="sr-only"
        aria-hidden="true"
        multiple
      />
      <Upload className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        {isDragging ? "Drop your files here" : "Drag and drop files here"}
      </h3>
      <p className="mt-1 text-sm text-gray-500">Or click to select files</p>
      {fileCount > 0 && (
        <div className="mt-4" aria-live="polite">
          <p className="text-sm font-medium text-gray-900">
            {fileCount} file{fileCount !== 1 ? "s" : ""} selected
          </p>
        </div>
      )}
    </Card>
  );
}
