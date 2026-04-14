export default function IconAndTemperature({
  iconUrl,
  temperature,
  description,
}) {
  return (
    <div className="flex flex-col items-center mb-6 sm:mb-8">
      <img
        src={iconUrl}
        alt="Ícone do clima"
        className="w-20 h-20 sm:w-24 sm:h-24"
      />
      <p className="text-6xl sm:text-7xl font-thin mt-2">{temperature}</p>
      <p className="text-white/80 text-base sm:text-lg mt-1 capitalize">
        {description}
      </p>
    </div>
  );
}
