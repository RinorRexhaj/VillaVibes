import { create } from "zustand";
import { Villa } from "../types/Villa";

interface VillaState {
  villas: Villa[];
  selectedVilla: Villa | null;
  setSelectedVilla: (villa: Villa | null) => void;
}

export const useVillaStore = create<VillaState>((set) => ({
  villas: [
    {
      id: 1,
      name: "Villa 1",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
    },
    {
      id: 2,
      name: "Villa 2",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
    },
    {
      id: 3,
      name: "Villa 3",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
    },
    {
      id: 4,
      name: "Villa 4",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
    },
    {
      id: 5,
      name: "Villa A",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
    },
    {
      id: 6,
      name: "Villa B",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
    },
    {
      id: 7,
      name: "Villa VIP 1",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
    },
    {
      id: 8,
      name: "Villa VIP 2",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
    },
  ],
  selectedVilla: null,
  setSelectedVilla: (villa) => set({ selectedVilla: villa }),
}));
