export const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-4 shadow-md">
      <a href="/">
        <h2 className="font-bold text-xl text-gray-600">
          <span className="text-blue-700">Weather</span>Watch
        </h2>
      </a>
      <button className="bg-blue-700 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition-all">
        Allow Access
      </button>
    </header>
  );
};
