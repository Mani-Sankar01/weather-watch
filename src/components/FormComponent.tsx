import React from "react";

interface HeroSectionProps {
  latitude: number | null;
  longitude: number | null;
  setLatitude: (lat: number) => void;
  setLongitude: (lon: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const FormComponent: React.FC<HeroSectionProps> = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  handleSubmit,
}) => {
  return (
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Latitude"
                required
              />
            </div>
            <div>
              <input
                type="number"
                value={longitude ?? ""}
                onChange={(e) => setLongitude(Number(e.target.value))}
                id="Longitude"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Longitude"
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
  );
};
