import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Villa } from "../../types/Villa";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useReservationStore } from "../../store/useReservationStore";
import { useEffect, useRef } from "react";
import { useDateStore } from "../../store/useDateStore";
import Carousel from "../../shared/Carousel";
import { useClientStore } from "../../store/useClientStore";

interface VillaModalProps {
  villa: Villa | null;
  reserved: boolean;
  onClose: () => void;
}

const VillaModal: React.FC<VillaModalProps> = ({
  villa,
  reserved,
  onClose,
}) => {
  const { addReservation } = useReservationStore();
  const { selectedDate } = useDateStore();
  const { name, phone, setName, setPhone } = useClientStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!villa) return null;

  const submitReservation = () => {
    if (!reserved && name && phone) {
      const hours = selectedDate.getHours();
      selectedDate.setHours(hours + 1);
      addReservation({
        client: name,
        phone: phone,
        villa: villa.name,
        startDate: selectedDate || new Date(),
        endDate: null,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden border border-gray-300 animate-fadeIn [animation-fill-mode:backwards]`}
      >
        <div className="h-60">
          <Carousel name={villa.name} />
        </div>

        {/* Modal Content */}
        <div className="p-5 flex justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{villa.name}</h2>
            <p className="text-lg font-semibold text-gray-700">
              ${villa.price}
            </p>
            <p className="text-md text-gray-600">Jacuzzi</p>
          </div>

          {/* Reservation Button */}
          <div className={`flex flex-col gap-3 items-end justify-start`}>
            {!reserved && (
              <form
                className="flex flex-col gap-2"
                onSubmit={submitReservation}
              >
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="border border-gray-200 px-3 py-1 rounded-md outline-none"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="border border-gray-200 px-3 py-1 rounded-md outline-none"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </form>
            )}
            <button
              className={`h-10 px-6 text-white font-semibold rounded-md shadow-sm transition-all duration-300 ${
                reserved
                  ? "bg-gray-400 cursor-not-allowed"
                  : name && phone
                  ? "bg-primary hover:shadow-lg"
                  : "bg-primary bg-opacity-50 cursor-not-allowed"
              }`}
              onClick={submitReservation}
            >
              {reserved ? "E rezervuar" : "Rezervo"}
            </button>
          </div>

          {/* Close Button */}
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer text-xl transition-all duration-200"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default VillaModal;
