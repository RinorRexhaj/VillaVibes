import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-semibold mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
