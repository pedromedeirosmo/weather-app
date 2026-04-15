export default function CardDetails({ humidity, windSpeed, feelsLike }) {
  return (
    <div className="grid grid-cols-3 items-start gap-2 sm:gap-3">
      <div className="bg-white/10 rounded-2xl p-3 sm:p-4 text-center">
        <p className="text-white/60 text-xs mb-1">Umidade</p>
        <p className="text-lg sm:text-xl font-semibold">{humidity}%</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-3 sm:p-4 text-center">
        <p className="text-white/60 text-xs mb-1">Vento</p>
        <p className="text-lg sm:text-xl font-semibold">{windSpeed} km/h</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-3 sm:p-4 text-center">
        <p className="text-white/60 text-xs mb-1">Sensação</p>
        <p className="text-lg sm:text-xl font-semibold">{feelsLike}°</p>
      </div>
    </div>
  );
}
