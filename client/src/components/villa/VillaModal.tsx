import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Villa } from "../../types/Villa";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

interface VillaModalProps {
  villa: Villa | null;
  onClose: () => void;
}

const VillaModal: React.FC<VillaModalProps> = ({ villa, onClose }) => {
  if (!villa) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 duration-300">
      <div
        className={`relative bg-white rounded-3xl tb:rounded-lg shadow-lg w-10/12 h-2/3 tb:w-[500px] overflow-hidden border border-black ${
          villa ? "animate-fadeIn" : "animate-fadeOut -z-50"
        } [animation-fill-mode:backwards]`}
      >
        <img
          src="/src/assets/img/villa.jpg"
          alt=""
          className="w-full h-1/2 object-cover"
        />
        <div className="px-5 py-4 flex">
          <div className="w-5/6 flex flex-col gap-2">
            <h2 className="text-xl font-bold">{villa.name}</h2>
            <p className="font-semibold text-lg">${villa.price}</p>
            <p className="font-medium text-md">Jaccuzzi</p>
          </div>
          <div className="w-full h-full flex justify-end items-end">
            <button
              className={`h-10 bg-primary ${
                villa.reserved && "bg-opacity-50 cursor-not-allowed"
              } font-semibold text-white py-2 px-4 rounded`}
              onClick={() => !villa.reserved && onClose()}
            >
              {villa.reserved ? "E rezervuar" : "Rezervo"}
            </button>
          </div>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="h-6 w-6 cursor-pointer absolute top-2 right-2"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default VillaModal;
