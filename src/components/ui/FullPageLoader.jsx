// src/components/ui/FullPageLoader.jsx

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      
      <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />

      <h1 className="mt-6 text-2xl font-bold text-white">
        Gaming Gear Store
      </h1>

      <p className="mt-2 text-sm text-gray-400">
        Waking up backend server...
      </p>
    </div>
  );
};

export default FullPageLoader;