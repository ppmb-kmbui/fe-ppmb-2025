import { dateToIndonesianString } from "@/utils/date";
import { PPMBEventProps } from "../Timeline";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { LocationPill } from "./TimelinePanelExtras";

export default function TimelinePanel({
  timeline,
  index,
  setIndex,
}: {
  timeline: PPMBEventProps;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const isOdd = index % 2 === 1;

  // Dynamic classes for the outer wrapper div
  const outerDivTranslateClass = isOdd
    ? "translate-x-[calc(var(--panel-width)*3)]"
    : "-translate-x-[calc(var(--panel-width)*3)]";

  // Dynamic classes for the 'li' div
  const liDivTranslateClass = isOdd ? "-translate-x-full" : "translate-x-full";
  const liDivBeforeLeftClass = isOdd
    ? "before:left-[var(--offset-left)]"
    : "before:left-[var(--offset-right)]";
  const liDivItemsClass = isOdd ? "items-end" : "items-start";

  const commonClasses = `justify-center li flex flex-col w-[var(--panel-width)] cursor-pointer`;

  const contentBoxFlow = isOdd ? "flex-row" : "flex-row-reverse";
  const contentBox = (
    <div className="w-[600px] h-[200px] bg-white rounded-2xl overflow-clip outline-3 outline-neutral-medium drop-shadow-md shadow-yellow-neutral-dark hover:scale-[1.01] duration-150">
      <div
        className={`${contentBoxFlow} flex w-full h-full justify-end items-center`}
      >
        <div className="grow h-full p-5 flex flex-col justify-between">
          <div className="flex flex-col h-2/3 overflow-scroll">
            <p className="grow">{timeline.description}</p>
          </div>
          {timeline.location && (
            <LocationPill locationName={timeline.location} />
          )}
        </div>
        <Image
          src={timeline.img}
          alt={timeline.imgAlt}
          width={100}
          height={100}
          className="h-full w-auto"
        />
      </div>
    </div>
  );

  // The common info div (date and name)
  const infoBox = (
    <div
      className={`${liDivTranslateClass} ${liDivBeforeLeftClass} ${liDivItemsClass} ${commonClasses}`}
      onClick={() => setIndex(index)}
    >
      <div
        className={`px-3 py-[5px] text-sm font-medium justify-center flex whitespace-nowrap`}
      >
        {dateToIndonesianString(timeline.startDate, timeline.monthLong)}{" "}
        {timeline.startDate.getTime() !== timeline.endDate.getTime() &&
          `— ${dateToIndonesianString(timeline.endDate)}`}
      </div>
      <span className="font-semibold text-xl text-ppmb-800 whitespace-nowrap px-3 py-[5px]">
        {timeline.name}
      </span>
    </div>
  );

  return (
    <div key={index} className={`flex ${outerDivTranslateClass}`}>
      {isOdd ? (
        // Order for odd keys: infoBox then contentBox
        <>
          {infoBox}
          {contentBox}
        </>
      ) : (
        // Order for even keys: contentBox then infoBox
        <>
          {contentBox}
          {infoBox}
        </>
      )}
    </div>
  );
}
