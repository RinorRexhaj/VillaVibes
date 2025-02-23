import { Villa } from "../../types/Villa";
import Carousel from "../../shared/Carousel";

interface VillaCardProps {
  villa: Villa;
  reserved: boolean;
  onClick: (villa: Villa) => void;
}

const VillaCard: React.FC<VillaCardProps> = ({ villa, reserved, onClick }) => {
  return (
    <div
      className="relative w-full h-72 border border-gray-200 rounded-md overflow-hidden shadow-md hover:shadow-xl duration-200 cursor-pointer bg-white"
      onClick={() => onClick(villa)}
    >
      {/* Image Carousel */}
      <div className="h-40">
        <Carousel name={villa.name} />
      </div>

      {/* Villa Info */}
      <div className="px-4 py-3 flex flex-col gap-2">
        <h1 className="font-semibold text-lg">{villa.name}</h1>
        <p className="text-md font-medium text-gray-600">${villa.price}</p>
      </div>

      {/* Reserved Overlay */}
      {reserved && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <h1 className="relative bottom-10 text-white text-xl font-bold">
            E rezervuar
          </h1>
        </div>
      )}
    </div>
  );
};

export default VillaCard;
