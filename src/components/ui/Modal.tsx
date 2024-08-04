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
  link: z.string().min(1, { message: "Link harus diisi!" })
});

const fileSchema = z.object({
  file: z.instanceof(File, { message: "Berkas tidak boleh kosong!" })
});

type LinkSchemaType = z.infer<typeof linkSchema>;
type FileSchemaType = z.infer<typeof fileSchema>;
type ModalData = LinkSchemaType | FileSchemaType;

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

const useDynamicForm = (type: "input" | "pdf" | "image") => {
  const schema = type === "input" ? linkSchema : fileSchema;
  return useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type = "input",
  label,
  sublabel = "",
  onSubmit,
  handleFileChange = () => {},
  file = null
}) => {
  const { register, control, handleSubmit, formState: { errors } } = useDynamicForm(type);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitModal = async (data: ModalData) => {
    try{
      setIsLoading(true);
      await onSubmit(data);

    } catch (error: any){
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
    <div className={`fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center ${isOpen ? 'block no-doc-scroll' : 'hidden'}`}>
      <div className="flex flex-col w-2/5 max-h-[90%] min-w-[360px] bg-ppmb-000 rounded-xl p-7">
        <div className="flex justify-end">
          <button className="hover:bg-ppmb-100 hover:text-ppmb-600 p-2 rounded-[6px] text-[22px]" onClick={onClose}>
            <HiOutlineX />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {type === "input" && (
            <div className="flex flex-col">
              <span className="text-xl font-medium">{label}</span>
              <span className="italic text-sm">{sublabel}</span>
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
                  description={`${sublabel ? `${sublabel}` : `Unggah dalam bentuk ${type === "image" ? '.jpg/.jpeg/.png' : ''}`}`}
                  fileType={type}
                  error={getErrorMessage('file')}
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
              onClick={() => { handleSubmit(submitModal)() }}
              label="Kumpulkan"
              size="md"
              type="submit"
              disabled={isLoading}
              className="w-[180px] mt-5"
            />
        </div>
        
        </div>
      </div>
    </div>
  );
};
