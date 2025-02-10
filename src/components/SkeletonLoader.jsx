const SkeletonLoader = () => {
  return (
    <div className="p-2 border rounded-lg shadow-md text-center animate-pulse bg-gray-200">
      <div className="w-full h-44 bg-gray-300 rounded-md"></div>
      <div className="h-4 w-3/4 bg-gray-400 mt-3 mx-auto rounded"></div>
      <div className="h-4 w-1/2 bg-gray-400 mt-2 mx-auto rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
