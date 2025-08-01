"use client";

import { HiOutlineX } from "react-icons/hi";
import { FileInput } from "./FileInput";
import { Input } from "./Input";
import { Button } from "./Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

const linkSchema = z.object({
  type: z.literal("link"),
  link: z.string().min(1, { message: "Link harus diisi!" }),
});

const fileSchema = z.object({
  uploadPreset: z.string(),
  type: z.literal("file"),
  file: z.instanceof(File, { message: "Berkas tidak boleh kosong!" }),
});

const modalSchema = z.discriminatedUnion("type", [linkSchema, fileSchema]);

type LinkSchemaType = z.infer<typeof linkSchema>;
type FileSchemaType = z.infer<typeof fileSchema>;
export type ModalData = z.infer<typeof modalSchema>;

interface ModalProps {
  type: "link" | "file";
  fileFormat?: "image" | "pdf";
  uploadPreset?: string;
  isOpen: boolean;
  onClose: () => void;
  label: string;
  sublabel?: string;
  onSubmit: (data: ModalData) => Promise<void>;
  handleFileChange?: (file: File | null) => void;
  file?: File | null;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = "file",
  fileFormat,
  uploadPreset,
  label,
  sublabel = "",
  onSubmit,
  handleFileChange = () => {},
  file = null,
}) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalData>({ resolver: zodResolver(modalSchema) });

  setValue("type", type);

  if (type === "file") {
    setValue("uploadPreset", uploadPreset!);
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitModal = async (data: ModalData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
    } catch (error: any) {
      console.error("Error while submit", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = () => {
    if (type === "link") {
      return (errors as any).link?.message;
    }
    if (type === "file") {
      return (errors as any).file?.message;
    }
    return undefined;
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[999] flex h-full w-full items-center justify-center bg-[rgba(255,255,255,0.8)] ${isOpen ? "no-doc-scroll block backdrop-blur-sm" : "hidden"}`}
    >
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-center rounded-xl bg-white">
        <div className="flex max-h-[90%] w-2/5 min-w-[360px] flex-col rounded-xl p-7">
          <div className="flex justify-end">
            <button
              className="hover:bg-ppmb-100 hover:text-ppmb-600 rounded-[6px] p-2 text-[22px]"
              onClick={onClose}
            >
              <HiOutlineX />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {type === "link" && (
              <div className="flex flex-col">
                <span className="text-xl font-medium">{label}</span>
                <span className="text-sm italic">{sublabel}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(submitModal)}>
              {type === "file" ? (
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FileInput
                      file={value as File | null}
                      onChange={(file) => {
                        onChange(file);
                        handleFileChange?.(file);
                      }}
                      label="Unggah berkas kamu"
                      description={`${sublabel ? `${sublabel}` : `Unggah dalam bentuk ${fileFormat === "image" ? ".jpg/.jpeg/.png" : ""}`}`}
                      fileType={fileFormat!}
                      error={getErrorMessage()}
                      answer=""
                    />
                  )}
                />
              ) : (
                <Input
                  placeholder="Isi di sini"
                  {...register("link")}
                  type="normal"
                  error={getErrorMessage()}
                />
              )}

              <div className="flex items-center justify-center">
                <Button
                  label="Kumpulkan"
                  size="md"
                  type="submit"
                  disabled={isLoading}
                  className="mt-5 w-[180px]"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
