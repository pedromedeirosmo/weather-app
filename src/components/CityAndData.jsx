export default function CityAndData({
  cityName,
  region,
  countryCode,
  date,
  time,
}) {
  function capitalizeWeekday(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2">
        <img
          alt="country flag"
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
          className="w-10 rounded-sm object-cover"
        />

        <h1 className="text-3xl font-bold">
          {cityName}
          {region != "Região" && `, ${region}`}
        </h1>
      </div>

      <p className="text-white/70 text-sm mt-1">{capitalizeWeekday(date)}</p>
      <p className="text-white/70 text-sm mt-1">{time.replace("GMT", "UTC")}</p>
    </div>
  );
}
