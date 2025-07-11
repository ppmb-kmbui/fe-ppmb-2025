import { HiLocationMarker } from "react-icons/hi";

export function LocationPill({ locationName }: { locationName: string }) {
  return (
    <div className="p-2 rounded-lg bg-turquoise-200 text-turquoise-300 font-semibold w-fit text-sm flex items-center gap-x-1">
      <HiLocationMarker className="text-pink-300" /> <span>{locationName}</span>
    </div>
  );
}
