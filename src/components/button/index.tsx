interface ButtonProps {
    label: string
    handleClick: Function
}

export const Button: React.FC<ButtonProps> = ({
    label
}) => {
    return (
    <button className="mt-5 bg-ppmb-blue-500 px-8 py-[10px] rounded-md text-white font-medium hover:bg-ppmb-blue-700 transition-colors duration-200 ease-in-out">
        {label}
    </button>
    )
}