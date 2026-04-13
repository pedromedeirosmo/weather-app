export default function CardDetails({ humidity, windSpeed, feelsLike }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white/10 rounded-2xl p-4 text-center">
        <p className="text-white/60 text-xs mb-1">Umidade</p>
        <p className="text-xl font-semibold">{humidity}</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 text-center">
        <p className="text-white/60 text-xs mb-1">Vento</p>
        <p className="text-xl font-semibold">{windSpeed}</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 text-center">
        <p className="text-white/60 text-xs mb-1">Sensação</p>
        <p className="text-xl font-semibold">{feelsLike}</p>
      </div>
    </div>
  );
}
