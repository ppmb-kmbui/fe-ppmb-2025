import { tv } from "tailwind-variants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: "primary" | "secondary" | "icon"
    color?: "blue" | "darkBlue" | "green" | "red" | "gray",
    size?: "sm" | "md" | "lg"
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const buttonVariants = tv({
    base: "flex flex-row rounded-md font-medium transition-colors duration-200 justify-center items-center ease-in-out gap-2 disabled:cursor-not-allowed disabled:opacity-80",
    variants: {
        variant: {
            primary: "bg-blue-500 text-white",
            secondary: "border-[2px] bg-transparent",
            icon: "p-1"
        },
        color: {
            blue: "bg-ppmb-blue-500 text-white hover:bg-ppmb-blue-600 disabled:hover:bg-ppmb-blue-500",
            darkBlue: "bg-ppmb-blue-700 text-white hover:bg-ppmb-800",
            green: "bg-ppmb-success text-white",
            red: "",
            gray: "bg-ppmb-600"
        },
        size: {
            sm: "",
            md: "min-w-[60px] lg:min-w-[80px] min-h-[30px] lg:min-h-[35px] px-4 lg:px-6 py-1 lg:py-[6px] text-sm lg:text-[16px]",
            lg: "min-w-[90px] min-h-[40px] lg:min-w-[125px] lg:min-h-[45px] px-3"
        }
    },
    compoundVariants: [
        {

        }
    ]
})

const loaderSizes = {
    sm: "w-[16px] h-[16px]",
    md: "w-[20px] h-[20px]",
    lg: "w-[24px] h-[24px]",
};

export const Button: React.FC<ButtonProps> = ({
    label, leftIcon, rightIcon, className,
    variant="primary", color="blue", size="md", 
    ...props
}) => {
    return (
        <button className={`${buttonVariants({ variant, color, size })} ${leftIcon && "pr-6 lg:pr-8"} ${rightIcon && "pl-2"} ${className}`} {...props}>
            {props.disabled ? 
                <div className={`loader-button ${loaderSizes[size]}`} /> 
            : 
                <>
                    {leftIcon && <span className="text-[18px] lg:text-[20px]">{leftIcon}</span>}
                    {label}
                    {rightIcon && <span>{rightIcon}</span>}
                </>
            }
        </button>
    )
}