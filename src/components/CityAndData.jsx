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
  function getFontSize(name) {
    if (name.length > 25) return "text-lg";
    if (name.length > 15) return "text-xl";
    return "text-2xl sm:text-3xl";
  }
  return (
    <div className="text-center sm:text-left mb-6">
      <div className="flex items-center justify-center gap-2">
        <img
          alt="country flag"
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
          className="w-8 rounded-sm object-cover shrink-0"
        />
        <h1
          className={`${getFontSize(cityName + region)} font-bold leading-tight text-left`}
        >
          {cityName}
          {region != "Região" && `, ${region}`}
        </h1>
      </div>
      <p className="text-white/70 text-sm mt-1">{capitalizeWeekday(date)}</p>
      <p className="text-white/70 text-sm mt-1">{time.replace("GMT", "UTC")}</p>
    </div>
  );
}
