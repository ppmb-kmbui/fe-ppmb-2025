import { tv } from "tailwind-variants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: "primary" | "secondary" | "icon"
    color?: "blue" | "darkBlue" | "green" | "red" | "gray",
    size?: "sm" | "md" | "lg"
}

const buttonVariants = tv({
    base: "flex flex-row rounded-md font-medium transition-colors duration-200 ease-in-out",
    variants: {
        variant: {
            primary: "bg-blue-500 text-white",
            secondary: "border-[2px]",
            icon: "p-1"
        },
        color: {
            blue: "bg-ppmb-blue-500 text-white hover:bg-ppmb-blue-600",
            darkBlue: "bg-ppmb-blue-700 text-white hover:bg-ppmb-800",
            green: "bg-ppmb-success text-white",
            red: "",
            gray: "bg-ppmb-600"
        },
        size: {
            sm: "",
            md: "px-6 py-[6px]",
            lg: "px-8 py-[9px]"
        }
    },
    compoundVariants: [
        {

        }
    ]
})

const typeClasses = {
    primary: 'bg-ppmb-blue-500 text-white hover:bg-ppmb-blue-700',
    secondary: 'bg-transparent text-ppmb-blue-500 border-[2px] border-ppmb-blue-500 hover:bg-ppmb-blue-100',
};

export const Button: React.FC<ButtonProps> = ({
    label, onClick, type="button", variant="primary", color="blue", size="md", ...props
}) => {
    return (
        <button className={buttonVariants({ variant, color, size })} onClick={onClick} {...props}>
            {label}
        </button>
    )
}
