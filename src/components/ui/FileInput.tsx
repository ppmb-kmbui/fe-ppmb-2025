"use client";

import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { FaFolderOpen, FaPlus } from "react-icons/fa6";
import { Button } from "./Button";

export interface FileInputProps {
  file: File | null;
  onChange: (file: File | null) => void;
  label: string;
  description: string;
  fileType: "image" | "pdf";
  error?: string;
  answer?: string;
  buttonText?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  file,
  onChange,
  label,
  description,
  fileType,
  error,
  answer,
  buttonText,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const openPhoto = () => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    onChange(file || null);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[2px]">
        <p className="text-neutral-dark text-center text-xl font-medium md:text-2xl">
          {label}
        </p>
        <p className="text-neutral-dark text-sm">{description}</p>
      </div>

      <div
        className="border-neutral-dark mt-5 flex max-h-[250px] w-[290px] flex-col items-center justify-between gap-2 rounded-lg border-[2px] border-dashed p-6 px-7 md:max-h-[300px] md:w-[450px] md:gap-6 md:pt-14 md:pb-10"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <FaFolderOpen className="text-neutral-dark text-[70px] md:text-[95px]" />

        <div className={`${file ? "gap-3" : "gap-2"} flex w-full flex-col`}>
          {file?.name ? (
            <span
              className="text-neutral-dark cursor-pointer text-center text-sm font-medium underline"
              onClick={openPhoto}
            >
              {file.name}
            </span>
          ) : answer != "" ? (
            <a
              className="text-neutral-dark overflow-hidden text-center text-ellipsis whitespace-nowrap underline"
              href={answer}
              target="_blank"
              rel="noopener noreferrer"
            >
              {answer}
            </a>
          ) : (
            <span className="text-center text-sm">
              Drag dan drop <br /> atau
            </span>
          )}

          <Button
            onClick={onChooseFile}
            label={buttonText || "Cari berkas"}
            leftIcon={<FaPlus />}
            isRestricted={answer == undefined}
            variant="primary"
          />
          <input
            ref={inputRef}
            accept={fileType === "image" ? "image/*" : ".pdf"}
            type="file"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  );
};
