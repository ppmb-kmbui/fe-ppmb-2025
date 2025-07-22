import { tv } from "tailwind-variants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "icon";
  color?: "yellow" | "gray";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRestricted?: boolean; // sorry for the unhinged code :))
}

const buttonVariants = tv({
  base: "flex flex-row font-medium hover:opacity-[0.8] transition-colors duration-75 justify-center items-center ease-in-out gap-2 disabled:cursor-not-allowed disabled:text-neutral-light disabled:opacity-80 hover:cursor-pointer",
  variants: {
    variant: {
      primary: "",
      secondary: "border-[2px] bg-transparent",
      icon: "p-1",
    },
    color: {
      yellow:
        "bg-yellow-300 text-neutral-dark hover:opacity-[0.8] hover:cursor-pointer disabled:hover:bg-yellow-300",
      gray: "bg-neutral-medium disabled:hover:bg-neutral-medium",
    },
    size: {
      sm: "",
      md: "min-w-[60px] lg:min-w-[80px] min-h-[30px] lg:min-h-[35px] px-4 lg:px-6 py-1 lg:py-[6px] text-sm lg:text-[16px]",
      lg: "min-w-[90px] min-h-[40px] lg:min-w-[125px] lg:min-h-[45px] px-3",
    },
  },
  compoundVariants: [{}],
});

const loaderSizes = {
  sm: "w-[16px] h-[16px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[24px] h-[24px]",
};

export const Button: React.FC<ButtonProps> = ({
  label,
  leftIcon,
  rightIcon,
  className,
  isRestricted,
  variant = "primary",
  color = "gray",
  size = "md",
  ...props
}) => {
  return (
    <button
      disabled={isRestricted}
      className={`${buttonVariants({ variant, color, size })} ${leftIcon && "pr-6 lg:pr-8"} ${rightIcon && "pl-2"} ${className}`}
      {...props}
    >
      {props.disabled ? (
        <div className={`loader-button ${loaderSizes[size]}`} />
      ) : (
        <>
          {leftIcon && (
            <span className="text-[18px] lg:text-[20px]">{leftIcon}</span>
          )}
          {label}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
