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
  type: z.literal("file"),
  file: z.instanceof(File, { message: "Berkas tidak boleh kosong!" }),
});

const modalSchema = z.discriminatedUnion("type", [linkSchema, fileSchema]);

type LinkSchemaType = z.infer<typeof linkSchema>;
type FileSchemaType = z.infer<typeof fileSchema>;
type ModalData = z.infer<typeof modalSchema>;

interface ModalProps {
  type: "input" | "pdf" | "image";
  isOpen: boolean;
  onClose: () => void;
  label: string;
  sublabel?: string;
  onSubmit: (data: ModalData) => void;
  handleFileChange?: (file: File | null) => void;
  file?: File | null;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = "input",
  label,
  sublabel = "",
  onSubmit,
  handleFileChange = () => {},
  file = null,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ModalData>({ resolver: zodResolver(modalSchema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitModal = async (data: ModalData) => {
    try {
      setIsLoading(true);
      onSubmit(data);
    } catch (error: any) {
      console.error("Error while submit", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (field: string) => {
    if (type === "input") {
      return (errors as any).link?.message;
    }
    if (type === "pdf" || type === "image") {
      return (errors as any).file?.message;
    }
    return undefined;
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[999] flex h-full w-full items-center justify-center bg-white backdrop-opacity-20 ${isOpen ? "no-doc-scroll block" : "hidden"}`}
    >
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
          {type === "input" && (
            <div className="flex flex-col">
              <span className="text-xl font-medium">{label}</span>
              <span className="text-sm italic">{sublabel}</span>
            </div>
          )}

          {type === "pdf" || type === "image" ? (
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
                  description={`${sublabel ? `${sublabel}` : `Unggah dalam bentuk ${type === "image" ? ".jpg/.jpeg/.png" : ""}`}`}
                  fileType={type}
                  error={getErrorMessage("file")}
                  answer=""
                />
              )}
            />
          ) : (
            <form onSubmit={handleSubmit(submitModal)}>
              <Input
                placeholder="Isi di sini"
                {...register("link")}
                type="normal"
                error={getErrorMessage(type)}
              />
            </form>
          )}

          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                handleSubmit(submitModal)();
              }}
              label="Kumpulkan"
              size="md"
              type="submit"
              disabled={isLoading}
              className="mt-5 w-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
