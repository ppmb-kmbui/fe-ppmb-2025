"use client";

import { body, title } from "@/styles/fonts";
import { forwardRef, Ref, useState } from "react";
import { HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import { tv } from "tailwind-variants";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  placeholder: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  variant?: "standard";
  error?: string;
  size?: "md" | "lg";
  ref?: Ref<HTMLInputElement>;
}

const inputVariants = tv({
  base: "flex flex-row bg-white items-center text-neutral-dark border-b-neutral-medium border-b-2 gap-x-2",
  variants: {
    variant: {
      standard: "w-full",
      // rounded: "rounded-3xl px-5"
    },
    size: {
      md: "text-lg py-[5px] px-3",
      lg: "text-lg lg:text-xl px-3 lg:px-4 h-[40px] lg:h-[45px]",
    },
  },
  defaultVariants: {
    variant: "standard",
    size: "md",
  },
});

export const Input = ({
  label,
  placeholder,
  icon,
  variant = "standard",
  size = "md",
  error,
  leftIcon,
  onChange,
  ref,
  ...props
}: InputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col gap-2">
      {(icon || label) && (
        <div className="flex flex-row items-center gap-1">
          <div className="text-[18px]">{icon}</div>
          <p className="font-medium text-neutral-800 lg:text-lg">{label}</p>
        </div>
      )}

      <div className={inputVariants({ variant, size })}>
        {leftIcon && (
          <label htmlFor={props.id} className="text-neutral-medium cursor-text">
            {leftIcon}
          </label>
        )}
        <input
          id={props.id}
          ref={ref}
          value={props.value}
          onChange={onChange}
          className={`placeholder:${title.className}! placeholder:text-neutral-medium placeholder:text-md w-full bg-white font-medium placeholder:font-normal focus:outline-none lg:placeholder:text-lg`}
          type={
            label?.split(" ").includes("Password") && !isVisible
              ? "password"
              : "text"
          }
          placeholder={placeholder}
          {...props}
        />
        {label?.split(" ").includes("Password") && (
          <button
            className="pl-3"
            onClick={() => setIsVisible(!isVisible)}
            type="button"
          >
            {isVisible ? <HiEye /> : <HiEyeOff />}
          </button>
        )}
      </div>

      {error && <p className="text-ppmb-red-500 text-sm">{error}</p>}
    </div>
  );
};
