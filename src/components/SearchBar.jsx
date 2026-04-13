import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchBar({ onClickSearchBtn }) {
  const [cityName, setCityName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  async function fetchCities(prefix) {
    if (!prefix) return [];

    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${prefix}&limit=5`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_GEODB_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        },
      );

      // Trata erro tipo 429
      if (!response.ok) {
        console.log("Erro na API:", response.status);
        return [];
      }

      const data = await response.json();
      return data.data || []; // Evita undefined
    } catch (error) {
      console.log("Erro ao buscar cidades:", error);
      return [];
    }
  }

  useEffect(() => {
    // limpa quando vazio
    if (!cityName.trim() || cityName.length < 3) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      const cities = await fetchCities(cityName);
      setSuggestions(cities);
    }, 600);

    return () => clearTimeout(delay);
  }, [cityName]);

  return (
    <div className="relative mb-8">
      <div className="flex gap-2">
        <input
          className="flex-1 bg-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Digite uma cidade..."
          value={cityName}
          onChange={(event) => setCityName(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickSearchBtn(cityName);
              setSuggestions([]);
            }
          }}
        />

        <button
          className="bg-white/20 hover:bg-white/30 rounded-2xl px-4 py-3 transition"
          onClick={() => {
            onClickSearchBtn(cityName);
            setSuggestions([]);
          }}
        >
          <SearchIcon />
        </button>
      </div>

      {suggestions?.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white text-black rounded-xl mt-2 overflow-hidden shadow-xl border border-gray-200 z-50">
          {suggestions.map((city) => (
            <div
              key={city.id}
              className="p-3 hover:bg-gray-200 cursor-pointer transition"
              onClick={() => {
                setCityName(city.name);
                setSuggestions([]); // Zera as sugestões
                onClickSearchBtn(`${city.name}, ${city.countryCode}`);
              }}
            >
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${city.countryCode}.svg`}
                alt="country flag"
                className="w-7 rounded-sm object-cover inline"
              />{" "}
              {city.name}, {city.region}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
