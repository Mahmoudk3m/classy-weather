import { useState, useEffect } from "react";
import Input from "./Input";
import Weather from "./Weather";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function App() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async (location) => {
    if (location.length < 2) {
      setWeather(null);
      return;
    }
    setIsLoading(true);

    try {
      // 1) Getting location (geocoding)
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);
      console.log(`${name} ${convertToFlag(country_code)}`);
      setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
      console.log(weatherData.daily);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <div className="App">
      <h1>Classy Weather</h1>
      <Input location={location} onChangeLocation={setLocation} />
      {isLoading && <h2>Loading ...</h2>}
      {weather && <Weather weather={weather} location={displayLocation} />}
    </div>
  );
}
