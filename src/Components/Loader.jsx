const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Loading our amazing products...
        </h2>
        <p className="text-gray-600">
          Please wait while we fetch the latest items for you
        </p>
      </div>
    </div>
  );
};

export default Loader;
