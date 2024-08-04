import React from 'react';

interface ProgressItem {
  name: string;
  progres: number;
  min: number;
}

interface MultiProgressBarProps {
  progressData: ProgressItem[];
  networkingRumpun: ProgressItem[];
}

export const MultiProgressBar: React.FC<MultiProgressBarProps> = ({
  progressData,
  networkingRumpun
}) => {
  return (
    <div className='flex flex-col'>
      {/* Networking Angkatan */}
      <div className='w-full'>
        <div className='ml-[110px] md:ml-[160px] flex flex-row text-xs font-medium'>
          {progressData.map((item, index) => (
            <div key={index} className='w-1/4 flex justify-center'>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row leading-[1.5] mb-[6px]">
        <div className="min-w-[110px] md:min-w-[160px]">
          <span className="font-semibold italic text-xs md:text-[16px]">Netw. Angkatan</span>
        </div>

        <div className="rounded-md min-w-[240px] md:min-w-[450px] bg-ppmb-200 relative flex flex-row">
          {progressData.map((item, index) => (
            <div className={`flex w-1/4 relative ${(index != progressData.length - 1) && `border-r-ppmb-800 border-r-[1px]`}`}>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="text-ppmb-000 font-medium text-xs md:text-[16px]">
                  {item.progres === item.min ? "Selesai" : `${item.progres}/${item.min}`}
                </span>
              </div>
              <div className={`absolute top-0 left-0 bg-ppmb-blue-600 h-full ${index == 0 && 'rounded-l-md'} ${index == (progressData.length - 1) && 'rounded-r-md'} ${(item.progres / item.min < 1) && 'rounded-r-md'} z-0`} style={{ width: `${(item.progres / item.min > 1 ? 1 : item.progres / item.min ) * 100}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Networking Rumpun */}
      <div className='w-full'>
        <div className='ml-[110px] md:ml-[160px] flex flex-row text-xs font-medium'>
          {networkingRumpun.map((item, index) => (
            <div key={index} className='w-1/3 flex justify-center'>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row leading-[1.5]">
        <div className="min-w-[110px] md:min-w-[160px]">
          <span className="font-semibold italic text-xs md:text-[16px]">Netw. Rumpun</span>
        </div>

        <div className="rounded-md min-w-[240px] md:min-w-[450px] bg-ppmb-200 relative flex flex-row">
          {networkingRumpun.map((item, index) => (
            <div className={`flex w-1/3 relative ${(index != networkingRumpun.length - 1) && `border-r-ppmb-800 border-r-[1px]`}`}>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="text-ppmb-000 font-medium text-xs md:text-[16px]">
                  {item.progres === item.min ? "Selesai" : `${item.progres}/${item.min}`}
                </span>
              </div>
              <div className={`absolute top-0 left-0 bg-ppmb-blue-600 h-full ${index == 0 && 'rounded-l-md'} ${index == (progressData.length - 1) && 'rounded-r-md'} ${(item.progres / item.min < 1) && 'rounded-r-md'} z-0`} style={{ width: `${(item.progres / item.min > 1 ? 1 : item.progres / item.min ) * 100}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};