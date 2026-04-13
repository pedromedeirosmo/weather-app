export default function CityAndData({
  cityName,
  region,
  countryCode,
  date,
  time,
}) {
  const regionNamesInPortuguese = new Intl.DisplayNames(["pt-BR"], {
    type: "region",
  });
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
          {region != "Região" && `, ${region}`} -{" "}
          {regionNamesInPortuguese.of(countryCode)}
        </h1>
      </div>

      <p className="text-white/70 text-sm mt-1">{date}</p>
      <p className="text-white/70 text-sm mt-1">{time} - Horário de Brasília</p>
    </div>
  );
}
