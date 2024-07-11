import Image from "next/image"

interface HeaderProps {
    label: string
    subLabel: string
}

export const Header: React.FC<HeaderProps> = () => {
    return (
        <div className="bg-gradient-to-r from-ppmb-blue-600 to-ppmb-blue-400 w-full min-h-[70px] md:min-h-[95px] flex justify-between gap-2 px-[25px] lg:px-[60px] items-center">
            <text className="font-semibold text-lg md:text-[21px] md:leading-[1.8] text-ppmb-000 flex gap-1">
                Buat Akun <text className="hidden md:block">PPMB KMBUI 2024</text>
            </text>

            <div className="flex max-w-[100px] md:max-w-[150px]">
                <Image
                    src={"/image/logo-full.png"}
                    alt={"Logo"}
                    width={150}
                    height={70}
                />
            </div>
            
        </div>
    )
}