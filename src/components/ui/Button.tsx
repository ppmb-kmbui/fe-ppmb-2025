interface ButtonProps {
    label: string
    handleClick: Function
    className?: string // due to no design system, this component's code already unhinged \\ x x //
}

export const Button: React.FC<ButtonProps> = ({
    label,
    handleClick,
    className = ''
}) => {
    return (
        <button 
            className={`bg-ppmb-blue-500 px-8 py-[10px] rounded-md text-white font-medium hover:bg-ppmb-blue-700 transition-colors duration-200 ease-in-out ${className}`}
            onClick={() => handleClick()}
        >
            {label}
        </button>
    )
}
