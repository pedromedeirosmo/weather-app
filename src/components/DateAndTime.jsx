export default function DateAndTime({ date, time }) {
  return (
    <div className="text-center sm:text-left mt-2 space-y-1">
      <p className="text-white/70 text-sm mt-1 capitalize">{date}</p>
      <p className="text-white/70 text-sm mt-1">{time.replace("GMT", "UTC")}</p>
    </div>
  );
}
