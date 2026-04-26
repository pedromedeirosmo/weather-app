import { Calendar, Clock } from "lucide-react";

export default function DateAndTime({ date, time }) {
  return (
    <div className="text-center sm:text-left mt-2 space-y-1">
      <div className="flex gap-1 items-center">
        <Calendar className="text-white/70 w-5" />
        <p className="text-white/70 text-sm capitalize">{date}</p>
      </div>
      <div className="flex gap-1 items-center">
        <Clock className="text-white/70 w-5" />
        <p className="text-white/70 text-sm">{time.replace("GMT", "UTC")}</p>
      </div>
    </div>
  );
}
