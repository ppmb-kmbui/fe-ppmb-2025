import { dateToIndonesianString } from "@/utils/date";
import { PPMBEventProps } from "../Timeline";
import Image from "next/image";
import { LocationPill } from "./TimelinePanelExtras";

export default function TimelinePanel({
  timeline,
  index,
}: {
  timeline: PPMBEventProps;
  index: number;
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

  const commonClasses = `justify-center li flex flex-col w-[var(--panel-width)]`;

  const contentBoxFlow = isOdd ? "flex-row" : "flex-row-reverse";
  const contentBox = (
    <div className="outline-neutral-medium shadow-yellow-neutral-dark h-[200px] w-[600px] overflow-clip rounded-2xl bg-white drop-shadow-md duration-150 hover:scale-[1.01]">
      <div
        className={`${contentBoxFlow} flex h-full w-full items-center justify-end`}
      >
        <div className="flex h-full grow flex-col justify-between p-5">
          <div className="flex h-2/3 flex-col overflow-scroll">
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
    >
      <div
        className={`flex justify-center px-3 py-[5px] text-sm font-medium whitespace-nowrap`}
      >
        {dateToIndonesianString(timeline.startDate, timeline.monthLong)}{" "}
        {timeline.startDate.getTime() !== timeline.endDate.getTime() &&
          `— ${dateToIndonesianString(timeline.endDate)}`}
      </div>
      <span className="text-ppmb-800 px-3 py-[5px] text-xl font-semibold whitespace-nowrap">
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
