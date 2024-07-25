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
            md: "px-6 py-[6px]",
            lg: "w-[125px] h-[45px]"
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
    label, leftIcon, rightIcon,
    variant="primary", color="blue", size="md", 
    ...props
}) => {
    return (
        <button className={`${buttonVariants({ variant, color, size })} ${leftIcon && "pr-2"} ${rightIcon && "pl-2"}`} {...props}>
            {props.disabled ? 
                <div className={`loader-button ${loaderSizes[size]}`} /> 
            : 
                <>
                    {leftIcon && <span>{leftIcon}</span>}
                    {label}
                    {rightIcon && <span>{rightIcon}</span>}
                </>
            }
        </button>
    )
}