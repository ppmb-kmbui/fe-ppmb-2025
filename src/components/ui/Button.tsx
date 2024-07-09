interface ButtonProps {
    label: string
    handleClick: Function
    variant?: 'lg' | 'md' | 'sm'
}

const variantClasses = {
    lg: 'py-[10px] px-8',
    md: 'py-[6px] px-6',
    sm: 'py-[1px] px-4',
};

export const Button: React.FC<ButtonProps> = ({
    label,
    handleClick,
    variant = 'md'
}) => {
    return (
        <button 
            className={`bg-ppmb-blue-500 rounded-md text-white font-medium hover:bg-ppmb-blue-700 transition-colors duration-200 ease-in-out ${variantClasses[variant]}`}
            onClick={() => handleClick()}
        >
            {label}
        </button>
    )
}
