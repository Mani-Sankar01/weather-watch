import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      {/* Hero Title & Form section  */}
      <div className="flex flex-col md:container p-4 mt-8 justify-center items-center">
        <h1 className="text-center text-2xl md:text-6xl font-bold mb-4 md:mb-8">
          Your Local Weather at a Glance
        </h1>
        <div className="p-5 shadow-md rounded-md w-full md:w-[800px]">
          <form>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <input
                  type="text"
                  id="latitude"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Latitude(e.g. 0.00000)"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
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
          <span className="text-blue-700">Bhubaneswar</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Temperature</h3>
            <h4 className="text-blue-700 font-bold text-xl">37.8°C</h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Feels Like</h3>
            <h4 className="text-blue-700 font-bold text-xl">37.8°C</h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Humidity</h3>
            <h4 className="text-blue-700 font-bold text-xl">37.8°C</h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Pressure</h3>
            <h4 className="text-blue-700 font-bold text-xl">37.8°C</h4>
          </div>

          <div className="shadow-md p-4 flex flex-col justify-center items-center gap-2 rounded-md">
            <h3 className="text-slate-500 text-lg">Temperature</h3>
            <h4 className="text-blue-700 font-bold text-xl">37.8°C</h4>
          </div>
        </div>
      </div>
      {/* Map section  */}
      <div className="px-10 mt-8">
        <h2 className="text-xl text-gray-500 border-b-2 pb-4">
          View On Map: <span className="text-blue-700">Bhubaneswar</span>
        </h2>
        <div className="flex gap-4 mt-4 md:mt-4">
          <div className="w-full border-2 p-4 rounded-md"></div>
          <div className="p-4 border-2 w-[600px] rounded-md">
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

      {/* Footer section  */}
      <div className="bg-blue-700 p-4 mt-8">
        <h6 className="text-center text-white">
          Design & Developed By{" "}
          <a
            href="https://github.com/Mani-Sankar01"
            target="_blank"
            className="font-bold"
          >
            {" "}
            Mani Sankar
          </a>
        </h6>
      </div>
    </>
  );
}

export default App;
