export default function IconAndTemperature({
  iconUrl,
  temperature,
  description,
}) {
  return (
    <div className="flex flex-col items-center mb-8">
      <img src={iconUrl} alt="Ícone do clima" className="w-24 h-24" />
      <p className="text-7xl font-thin mt-2">{temperature}</p>
      <p className="text-white/80 text-lg mt-1">{description}</p>
    </div>
  );
}
