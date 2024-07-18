import Image from "next/image"

export const LoadingScreen: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-ppmb- justify-center items-center gap-5 px-[60px]">
            <Image
                src={'/image/mascot.png'}
                alt="mascot"
                width={600}
                height={600}
            />
            
            <div className="text-3xl font-semibold text-center">
                <text>Loading</text>
                <span className="animate-dots">
                    <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                </span>
            </div>
        </div>
    )
}