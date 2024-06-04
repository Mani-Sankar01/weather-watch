import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
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

        console.log("Fetched Latitude:", latitude);
        console.log("Fetched Longitude:", longitude);
      },
      (err) => {
        console.error(err);
        setError("Failed to get current location");
        setLoading(false);
      }
    );
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
    }
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

  {
    !loading && <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      {/* Hero Title & Form section  */}
      <div className="flex flex-col md:container p-4 mt-8 justify-center items-center">
        <h1 className="text-center text-2xl md:text-6xl font-bold mb-4 md:mb-8">
          Your Local Weather at a Glance
        </h1>
        <div className="p-5 shadow-md rounded-md w-full md:w-[800px]">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <input
                  type="number"
                  value={latitude ?? ""}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  id="latitude"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Latitude(e.g. 0.00000)"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  value={longitude ?? ""}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  id="Longitude"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Longitude(e.g. 0.00000)"
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get Information
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Information Section  */}
      <div className="px-10 mt-8">
        <h2 className="text-xl text-gray-500 border-b-2 pb-4">
          Weather Information:{" "}
          <span className="text-blue-700">{weatherData?.name}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Temperature</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {weatherData?.main.temp}°C
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Feels Like</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {weatherData?.main.feels_like}°C
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Humidity</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {weatherData?.main.humidity}%
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Pressure</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {weatherData?.main.pressure} hPa
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Wind Speed</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {weatherData?.wind.speed} m/s
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Wind Direction</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {weatherData?.wind.deg}°
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Country</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {weatherData?.sys.country}
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Sunrise</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {new Date(weatherData?.sys.sunrise * 1000).toLocaleTimeString()}
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Sunset</h3>
            <h4 className="text-blue-700 font-bold text-xl">
              {new Date(weatherData?.sys.sunset * 1000).toLocaleTimeString()}
            </h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Weather Condition</h3>
            <h4 className="text-blue-700 font-bold text-xl capitalize">
              {weatherData?.weather[0].description}
            </h4>
          </div>
        </div>
      </div>
      {/* Map section  */}
      {latitude && longitude && (
        <div className="px-10 mt-8">
          <h2 className="text-xl text-gray-500 border-b-2 pb-4">
            View On Map:{" "}
            <span className="text-blue-700">{weatherData?.name}</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-4">
            <div className="w-full border-2 p-4 rounded-md">
              <MapContainer
                center={[latitude, longitude]}
                zoom={14}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            {/* Recent History  */}
            <div className="p-4 border-2 w-full md:w-[600px] rounded-md">
              <h2 className="text-xl text-gray-500 border-b-2 pb-4 mb-2">
                Recent Search History
              </h2>
              <div className="flex justify-between border-b-2 mb-2 border-slate-100">
                <h5 className="text-slate-600 text-md">0.00000, 0.0000</h5>
                <h6 className="text-slate-600 text-sm">06/05/2024, 08:55PM</h6>
              </div>

              <div className="flex justify-between border-b-2 mb-2 border-slate-100">
                <h5 className="text-slate-600 text-md">0.00000, 0.0000</h5>
                <h6 className="text-slate-600 text-sm">06/05/2024, 08:55PM</h6>
              </div>

              <div className="flex justify-between border-b-2 mb-2 border-slate-100">
                <h5 className="text-slate-600 text-md">0.00000, 0.0000</h5>
                <h6 className="text-slate-600 text-sm">06/05/2024, 08:55PM</h6>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
