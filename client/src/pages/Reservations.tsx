import VillaCard from "../components/villa/VillaCard";
import VillaModal from "../components/villa/VillaModal";
import { useVillaStore } from "../store/useVillaStore";

const Reservations = () => {
  const { villas, selectedVilla, setSelectedVilla } = useVillaStore();

  return (
    <div className="absolute top-48 tb:top-20 w-full h-auto px-4 sm:px-6 flex flex-col gap-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-semibold text-3xl tb:text-xl">
          Check out our Villas
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 sm:gap-6">
          {villas.map((villa) => (
            <VillaCard
              key={villa.id}
              villa={villa}
              onClick={setSelectedVilla}
            />
          ))}
        </div>
        <VillaModal
          villa={selectedVilla}
          onClose={() => setSelectedVilla(null)}
        />
      </div>
    </div>
  );
};

export default Reservations;
