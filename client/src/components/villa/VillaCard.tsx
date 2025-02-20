import { useState } from "react";
import { Villa } from "../../types/Villa";

interface VillaCardProps {
  villa: Villa;
  onClick: (villa: Villa) => void;
}

const VillaCard: React.FC<VillaCardProps> = ({ villa, onClick }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div
      className="relative w-72 h-64 border rounded-md overflow-hidden shadow-sm hover:shadow-lg duration-150 cursor-pointer"
      onClick={() => onClick(villa)}
    >
      <img
        src="/src/assets/img/villa.jpg"
        alt=""
        className="w-full h-40 object-cover"
      />
      <div className="px-3 py-2 flex flex-col gap-3">
        <h1 className="font-semibold text-lg">{villa.name}</h1>
        <p className="font-medium">{villa.price}$</p>
      </div>
      {villa.reserved && (
        <div className="absolute w-full h-full flex justify-center items-center inset-0 bg-gray-300 bg-opacity-50">
          <h1 className="mb-10 text-white text-xl font-bold">E rezervuar</h1>
        </div>
      )}
    </div>
  );
};

export default VillaCard;
