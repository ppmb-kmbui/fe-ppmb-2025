interface ProgressBarProps {
    label: string
    currentProgress: number
    totalProgress: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    label, currentProgress, totalProgress
}) => {
    const progress = 75

    return (
        <div className="flex flex-row leading-[1.5]">
            <div className="min-w-[140px]">
                <text className="font-semibold italic">{label}</text>
            </div>

            <div className="rounded-md min-w-[450px] bg-ppmb-200 relative items-center flex">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <text className="text-ppmb-000 font-medium rounded-md text-[16px]">{currentProgress/totalProgress == 1 ? "Selesai" : `${currentProgress}/${totalProgress}`}</text>
                </div>

            <div
                className="absolute top-0 left-0 bg-ppmb-blue-600 h-full rounded-md z-0"
                style={{ width: `${(currentProgress/totalProgress)*100}%` }}
            />
        </div>
        </div>
    )
}