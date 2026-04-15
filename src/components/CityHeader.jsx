export default function CityHeader({ cityName, region, countryCode }) {
  function getFontSize(name) {
    if (name.length > 25) return "text-xl";
    if (name.length > 15) return "text-2xl";
    return "text-3xl sm:text-4xl";
  }

  const fullName = region !== "Região" ? `${cityName}, ${region}` : cityName;
  const isLong = fullName.length > 15;

  return (
    <div
      className={`flex mb-2 ${isLong ? "flex-col items-center sm:flex-row sm:items-center sm:justify-start" : "flex-row items-center justify-center sm:justify-start"} gap-2`}
    >
      <img
        alt="country flag"
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
        className="w-8 rounded-sm object-cover shrink-0"
      />
      <h1
        className={`${getFontSize(fullName)} font-bold leading-tight text-center sm:text-left text-balance`}
      >
        {fullName}
      </h1>
    </div>
  );
}
