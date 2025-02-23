import { useEffect, useCallback } from "react";
import VillaCard from "../components/villa/VillaCard";
import VillaModal from "../components/villa/VillaModal";
import { useVillaStore } from "../store/useVillaStore";
import { useReservationStore } from "../store/useReservationStore";
import Loading from "../shared/Loading";
import { Villa } from "../types/Villa";
import Calendar from "../components/Calendar";
import { useDateStore } from "../store/useDateStore";

const Reservations = () => {
  const { villas, selectedVilla, setSelectedVilla } = useVillaStore();
  const { reservations, fetchReservations, loading } = useReservationStore();
  const { selectedDate } = useDateStore();

  useEffect(() => {
    fetchReservations(selectedDate || new Date());
  }, [selectedDate]);

  const isReserved = useCallback(
    (villa: Villa | null): boolean => {
      if (!villa) return false;
      return [...reservations].some((res) => {
        return (
          res.villa === villa.name &&
          new Date(res.startDate).toISOString().split("T")[0] ===
            new Date(selectedDate).toISOString().split("T")[0]
        );
      });
    },
    [reservations, selectedDate]
  );

  if (loading) return <Loading />;

  return (
    <div className="relative w-full max-h-screen h-full mt-16 flex flex-col md:flex-row gap-6 px-4">
      <div className="flex flex-col tb:flex-row gap-6 w-full">
        {/* Main Content */}
        <div className="flex-1 pt-6 max-w-7xl max-h-[calc(100vh-100px)] mx-auto w-full flex flex-col flex-grow ">
          {/* Header Section */}
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-xl tb:text-2xl font-semibold text-gray-900">
              Check out our Villas
            </h1>
            <Calendar />
          </div>

          {/* Villas Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 overflow-y-auto h-[calc(100vh-160px)] pb-5">
            {villas.map((villa) => (
              <VillaCard
                key={villa.id}
                villa={villa}
                reserved={isReserved(villa)}
                onClick={setSelectedVilla}
              />
            ))}
          </div>

          {selectedVilla && (
            <VillaModal
              villa={selectedVilla}
              reserved={isReserved(selectedVilla)}
              onClose={() => setSelectedVilla(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
