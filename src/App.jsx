import SearchBar from "./components/SearchBar";
import CityAndData from "./components/CityAndData";
import IconAndTemperature from "./components/IconAndTemperature";
import CardDetails from "./components/CardDetails";
import { useEffect, useState } from "react";

function formattingDate() {
  const date = new Date();
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [clima, setClima] = useState({});
  const [time, setTime] = useState("");
  const [cityName, setCityName] = useState("Cidade");
  const [region, setRegion] = useState("Região");
  const [countryCode, setCountryCode] = useState("CD");
  const [date, setDate] = useState(formattingDate());
  const [icon, setIcon] = useState(
    "https://openweathermap.org/img/wn/03d@2x.png",
  );
  const [temperature, setTemperature] = useState("0°");
  const [description, setDescription] = useState("Descrição");
  const [humidity, setHumidity] = useState("0%");
  const [windSpeed, setWindSpeed] = useState("0 km/h");
  const [feelsLike, setFeelsLike] = useState("0°");

  function setHooks(data, city) {
    setClima(data);
    setCityName(city.name || data.name);
    setRegion(city?.region || "Região");
    setCountryCode(city.countryCode || data.sys.country);
    setDate(formattingDate());

    const formattedTemp = `${Math.round(data.main.temp)}°`;
    setTemperature(formattedTemp);
    setDescription(data.weather[0].description);
    const formattedHumidity = `${data.main.humidity}%`;
    setHumidity(formattedHumidity);
    const formattedWindSpeed = `${Math.round(data.wind.speed * 3.6)} km/h`;
    setWindSpeed(formattedWindSpeed);
    const formattedFeelsLike = `${Math.round(data.main.feels_like)}°`;
    setFeelsLike(formattedFeelsLike);

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    setIcon(iconUrl);
  }

  async function onClickSearchBtn(city) {
    try {
      let url;

      if (city.latitude != null && city.longitude != null) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=pt_br`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=pt_br`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert("Cidade não encontrada");
        return;
      }

      setHooks(data, city);
    } catch (error) {
      console.log("Erro real:", error);
    }
  }

  function getUserLocationWeather() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=pt_br`,
        );
        const data = await response.json();

        const bigDataCloudResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`,
        );
        const bigCloudData = await bigDataCloudResponse.json();

        if (data.cod !== 200) {
          alert("Erro ao buscar clima pela localização");
          return;
        }
        setHooks(data, {
          name: data.name,
          region: bigCloudData.principalSubdivision,
          latitude: lat,
          longitude: lon,
        });
      },
      (error) => {
        if (error.code === 1) {
          alert("Permissão de localização negada");
        } else {
          alert("Não foi possível obter sua localização");
        }
      },
    );
  }
  useEffect(() => {
    if ("geolocation" in navigator) {
      getUserLocationWeather();
    }
  }, []);

  // Tempo da hora
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const interval = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);

    return () => clearInterval(interval); // Quando esse componente sair da tela, para esse intervalo
  }, []);

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

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-fit text-white">
        <SearchBar
          onClickSearchBtn={onClickSearchBtn}
          fetchCities={fetchCities}
        />
        <CityAndData
          cityName={cityName}
          region={region}
          countryCode={countryCode}
          date={date}
          time={time}
        />
        <IconAndTemperature
          iconUrl={icon}
          temperature={temperature}
          description={description}
        />
        <CardDetails
          humidity={humidity}
          windSpeed={windSpeed}
          feelsLike={feelsLike}
        />
      </div>
    </div>
  );
}
