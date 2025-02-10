const SklLoader = () => {
  return (
    <div className="w-full bg-blue-50 py-14">
      <div className="max-w-[90%] mx-auto bg-white p-8 rounded-xl shadow-lg animate-pulse">
        <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="w-full h-80 bg-gray-300 rounded-lg"></div>
            <div className="flex gap-4 mt-4">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-300 rounded-md"
                  ></div>
                ))}
            </div>
          </div>
          <div>
            <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 w-64 bg-gray-300 rounded mb-3"></div>
            <div className="h-6 w-24 bg-gray-300 rounded mb-3"></div>
            <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="h-20 w-full bg-gray-300 rounded mb-4"></div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SklLoader;
