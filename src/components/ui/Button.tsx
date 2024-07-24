interface ButtonProps {
    label: string
    handleClick?: () => void
    variant?: 'lg' | 'md' | 'sm'
    type?: 'primary' | 'secondary'
}

const variantClasses = {
    lg: 'py-[10px] px-8',
    md: 'py-[6px] px-6',
    sm: 'py-[1px] px-4',
};

const typeClasses = {
    primary: 'bg-ppmb-blue-500 text-white hover:bg-ppmb-blue-700',
    secondary: 'bg-transparent text-ppmb-blue-500 border-[2px] border-ppmb-blue-500 hover:bg-ppmb-blue-100',
};

export const Button: React.FC<ButtonProps> = ({
    label,
    handleClick,
    variant = 'md',
    type = 'primary'
}) => {
    return (
        <button 
            className={`rounded-md font-medium transition-colors duration-200 ease-in-out ${variantClasses[variant]} ${typeClasses[type]}`}
            // onClick={() => handleClick()}
            type="submit"
        >
            {label}
        </button>
    )
}
