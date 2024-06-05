import { useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WeatherInfo } from "./components/WeatherInfo";
import { MapComponent } from "./components/MapComponent";
import { FormComponent } from "./components/FormComponent";
import { SearchHistory } from "./components/SearchHistory";
import { LoaderCircle } from "lucide-react";

function App() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState<
    { latitude: number; longitude: number; date: Date }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      // setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5f675c4d478fa713e5f9d509f69b56fb&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchWeatherData(latitude, longitude);
      },
      (err) => {
        console.error(err);
        setError("Failed to get current location");
        setLoading(false);
      }
    );

    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeatherData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const handleLocationChange = (lat: number, lon: number) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (latitude !== null && longitude !== null) {
      fetchWeatherData(latitude, longitude);
      const newSearch = {
        latitude: latitude,
        longitude: longitude,
        date: new Date(),
      };
      setSearchHistory([...searchHistory, newSearch]);
      localStorage.setItem(
        "searchHistory",
        JSON.stringify([...searchHistory, newSearch])
      );
    }
  };

  const handleRecentSearchClick = (index: number) => {
    const search = searchHistory[index];
    setLatitude(search.latitude);
    setLongitude(search.longitude);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchWeatherData(latitude, longitude);
      },
      (err) => {
        console.error(err);
        setError("Failed to get current location");
        setLoading(false);
      }
    );
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;
        handleLocationChange(lat, lng);
      },
    });

    return latitude && longitude ? (
      <Marker position={[latitude, longitude]} />
    ) : null;
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <LoaderCircle className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <>
      <Header getLocation={getLocation} />

      <FormComponent
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        handleSubmit={handleSubmit}
      />

      <div className="px-4 md:px-10 mt-8">
        <div className="flex flex-col-reverse md:flex-row gap-4 mt-4 md:mt-4">
          <div className="w-full">
            <h2 className="text-xl text-gray-500 border-b-2 pb-4 mb-4">
              View On Map:{" "}
              <span className="text-blue-700">{weatherData?.name}</span>
            </h2>
            {latitude && longitude && (
              <MapComponent
                handleLocationChange={handleLocationChange}
                latitude={latitude}
                longitude={longitude}
              />
            )}
          </div>
          {weatherData && <WeatherInfo weatherData={weatherData} />}
        </div>
      </div>
      <div className="px-4 md:px-10 mt-8">
        <div className="p-4 border-2 w-full  rounded-md">
          <h2 className="text-xl text-gray-500 border-b-2 pb-4 mb-2">
            Recent Search History
          </h2>
          {searchHistory.map((search, index) => (
            <SearchHistory
              key={index}
              lat={search.latitude}
              long={search.longitude}
              date={new Date(search.date).toLocaleDateString()}
              time={new Date(search.date).toLocaleTimeString()}
              onclick={() => handleRecentSearchClick(index)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
