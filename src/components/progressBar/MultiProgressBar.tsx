import React from "react";

interface ProgressItem {
  name: string;
  progress: number;
  min: number;
}

interface MultiProgressBarProps {
  progressData: ProgressItem[];
  networkingRumpun: ProgressItem[];
}

export const MultiProgressBar: React.FC<MultiProgressBarProps> = ({
  progressData,
  networkingRumpun,
}) => {
  return (
    <div className="flex flex-col gap-y-5">
      {/* Networking Rumpun */}
      <div className="flex h-fit flex-col items-center gap-y-2">
        <span className="text-sm font-semibold md:text-lg">
          Networking Rumpun
        </span>

        <div className="flex h-fit w-full flex-col gap-2 rounded-lg bg-purple-100 p-5 md:flex-row md:gap-5">
          {networkingRumpun.map((item, index) => {
            const percentage = (item.progress / item.min) * 100;
            return (
              <div key={index} className="relative flex w-full md:w-1/3">
                <div className="z-10 flex w-full flex-col items-center justify-center gap-y-2">
                  <p className="text-sm lg:text-[16px]">
                    {item.name.replace("_", " & ").replace("VOK", "VOKASI")}
                  </p>
                  <span
                    className="w-full rounded-full py-1 text-center text-xs font-semibold text-white md:text-[16px]"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--color-purple-500) 0%, var(--color-purple-500) ${percentage}%, var(--color-purple-300) ${percentage}%, var(--color-purple-300) 100%)`,
                    }}
                  >
                    {item.progress >= item.min
                      ? "Selesai"
                      : `${item.progress}/${item.min}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Networking Angkatan */}
      <div className="flex h-fit flex-col items-center gap-y-2">
        <span className="text-sm font-semibold md:text-lg">
          Networking Angkatan
        </span>

        <div className="flex h-fit w-full flex-col gap-5 rounded-md bg-purple-100 p-5 md:flex-row">
          {progressData.map((item, index) => {
            const percentage = (item.progress / item.min) * 100;
            return (
              <div key={index} className="relative flex w-full md:w-1/4">
                <div className="z-10 flex w-full flex-col items-center justify-center gap-y-2">
                  <p className="text-sm lg:text-[16px]">{item.name}</p>
                  <span
                    className="w-full rounded-full py-1 text-center text-xs font-semibold text-white md:text-[16px]"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--color-purple-500) 0%, var(--color-purple-500) ${percentage}%, var(--color-purple-300) ${percentage}%, var(--color-purple-300) 100%)`,
                    }}
                  >
                    {item.progress >= item.min
                      ? "Selesai"
                      : `${item.progress}/${item.min}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
