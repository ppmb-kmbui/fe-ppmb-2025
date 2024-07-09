import React from 'react';

export const MultiProgressBar: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <div className='w-full'>
                <div className='ml-[150px] flex flex-row text-sm font-medium'>
                    <div className='w-1/4 flex justify-center'>
                        <text>RIK</text>
                    </div>

                    <div className='w-1/4 flex justify-center'>
                        <text>Saintek</text>
                    </div>

                    <div className='w-1/4 flex justify-center'>
                        <text>Soshum</text>
                    </div>

                    <div className='w-1/4 flex justify-center'>
                        <text>Vokasi</text>
                    </div>
                </div>
            </div>

            <div className="flex flex-row leading-[1.5]">
                <div className="min-w-[160px]">
                    <text className="font-semibold italic">Networking kating</text>
                </div>

                <div className="rounded-md min-w-[450px] bg-ppmb-200 relative flex flex-row">
                    <div className="flex w-1/4 relative border-r-ppmb-800 border-r-[1px]">
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <text className="text-ppmb-000 font-medium rounded-l-md text-[16px]">
                                {1/3 === 1 ? "Selesai" : `${1}/${3}`}
                            </text>
                        </div>
                        <div className="absolute top-0 left-0 bg-ppmb-blue-600 h-full rounded-r-md rounded-l-md z-0" style={{ width: `${(1/3) * 100}%` }} />
                    </div>

                    <div className="flex w-1/4 relative border-r-ppmb-800 border-r-[1px]">
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <text className="text-ppmb-000 font-medium text-[16px]">
                                {2/3 === 1 ? "Selesai" : `${2}/${3}`}
                            </text>
                        </div>
                        <div className="absolute top-0 left-0 bg-ppmb-blue-600 rounded-r-md h-full z-0" style={{ width: `${(2/3) * 100}%` }} />
                    </div>

                    <div className="flex w-1/4 relative border-r-ppmb-800 border-r-[1px]">
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <text className="text-ppmb-000 font-medium rounded-r-md text-[16px]">
                                {3/3 === 1 ? "Selesai" : `${2}/${3}`}
                            </text>
                        </div>
                        <div className="absolute top-0 left-0 bg-ppmb-blue-600 h-full z-0" style={{ width: `${(3/3) * 100}%` }} />
                    </div>

                    <div className="flex w-1/4 relative">
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <text className="text-ppmb-000 font-medium rounded-r-md text-[16px]">
                                {2/3 === 1 ? "Selesai" : `${2}/${3}`}
                            </text>
                        </div>
                        <div className="absolute top-0 left-0 bg-ppmb-blue-600 h-full rounded-r-md z-0" style={{ width: `${(2/3) * 100}%` }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
