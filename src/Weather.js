import Day from "./Day";
export default function Weather({ weather, location }) {
  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {weather.time.map((date, i) => (
          <Day
            date={date}
            max={weather.temperature_2m_max[i]}
            min={weather.temperature_2m_min[i]}
            code={weather.weathercode[i]}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}
