export const ProgressBar: React.FC = () => {
    const progress = 75

    return (
        <div className="flex flex-row text-[18px] leading-[1.5]">
            <div className="min-w-[120px]">
                <text className="font-semibold">Foster Sibling</text>
            </div>

            <div className="rounded-md min-w-[400px] bg-ppmb-200 relative">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                <text className="text-ppmb-000 font-medium rounded-md">3/4</text>
            </div>

            <div
                className="absolute top-0 left-0 bg-blue-500 h-full rounded-md z-0"
                style={{ width: `${progress}%` }}
            />
        </div>
        </div>
    )
}