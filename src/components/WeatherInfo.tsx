import React, { useEffect, useState } from "react";
import { InfoCard } from "./InfoCard";
import { MapPin, MoonStar, Sun, Sunrise, Sunset } from "lucide-react";

interface WeatherInfoProps {
  weatherData: any;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCelsius, setIsCelsius] = useState(true); // State to track whether temperature is in Celsius
  const [temp, setTemp] = useState<number>() || null;
  const [feels, setFeels] = useState<number>() || null;

  const toggleUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius); // Toggle between Celsius and Fahrenheit
  };

  useEffect(() => {
    if (!isCelsius) {
      setTemp((prevTemp) =>
        prevTemp != null ? (prevTemp * 9) / 5 + 32 : undefined
      );
      setFeels((prevFeels) =>
        prevFeels != null ? (prevFeels * 9) / 5 + 32 : undefined
      );
    } else {
      setTemp(weatherData?.main.temp);
      setFeels(weatherData?.main.feels_like);
    }
  }, [isCelsius]);

  useEffect(() => {
    // Update temp and feels states when weatherData changes
    setTemp(weatherData?.main.temp);
    setFeels(weatherData?.main.feels_like);
  }, [weatherData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentHour = currentTime.getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18;

  return (
    <div className="p-4  w-full md:w-[600px] lg:w-[800px] rounded-2xl bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-center gap-2">
      <div className="flex flex-col items-center">
        <h4 className="text-white text-sm text-center">Temperature</h4>
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center flex justify-start">
          {!temp ? weatherData.main.temp : temp.toFixed(2)}
          <span className="text-lg"> {isCelsius ? "°C" : "°F"}</span>{" "}
          {/* Display temperature unit based on isCelsius state */}
        </h2>
        <button
          className="bg-white/10 text-white px-3 rounded-md mt-2"
          onClick={toggleUnit}
        >
          Covert to {isCelsius ? "°F" : "°C"}
        </button>
      </div>
      <div className="flex gap-4 mt-2">
        <h3 className="text-white  flex gap-2">
          {isDaytime ? <Sun /> : <MoonStar />}
          {new Date().toLocaleTimeString()}
        </h3>
        <h3 className="text-white  flex gap-2">
          <MapPin />
          {weatherData?.name}
        </h3>
      </div>
      <div className="p-4 border-t-2 w-full flex bg-white/10 rounded-lg mt-4 justify-between">
        <div>
          <Sunrise className="text-white w-6 h-6" />
          <h4 className="text-white/50 text-sm">Sunrise</h4>
          <h6 className="text-white font-bold">
            {new Date(weatherData?.sys.sunrise * 1000).toLocaleTimeString()}
          </h6>
        </div>

        <div>
          <Sunset className="text-white w-6 h-6" />
          <h4 className="text-white/50 text-sm">Sunset</h4>
          <h6 className="text-white font-bold">
            {new Date(weatherData?.sys.sunset * 1000).toLocaleTimeString()}
          </h6>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 col-auto">
        {/* Pass the toggleUnit function and isCelsius state to the InfoCard component */}
        <InfoCard
          icon={<Sunrise />}
          title="Temperature"
          value={!temp ? weatherData.main.temp : temp.toFixed(2)}
          unit={isCelsius ? " °C" : "°F"}
        />

        <InfoCard
          icon={<Sunrise />}
          title="Feels Like"
          value={!feels ? weatherData.main.feels_like : feels.toFixed(2)}
          unit={isCelsius ? " °C" : "°F"}
        />
        <InfoCard
          icon={<Sunrise />}
          title="Humidity"
          value={weatherData?.main.humidity}
          unit="%"
        />
        <InfoCard
          icon={<Sunrise />}
          title="Pressure"
          value={weatherData?.main.pressure}
          unit=" hPa"
        />
        <InfoCard
          icon={<Sunrise />}
          title="Wind Speed"
          value={weatherData?.wind.speed}
          unit=" m/s"
        />

        <InfoCard
          icon={<Sunrise />}
          title="Wind Direction"
          value={weatherData?.wind.deg}
          unit="°"
        />

        <InfoCard
          icon={<Sunrise />}
          title="Weather Condition"
          value={weatherData?.weather[0].description}
        />
      </div>
    </div>
  );
};
