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
      name: "Luxury Beach Villa",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
      reserved: false,
    },
    {
      id: 2,
      name: "Mountain Retreat",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
      reserved: false,
    },
    {
      id: 3,
      name: "Luxury Beach Villa",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
      reserved: false,
    },
    {
      id: 4,
      name: "Mountain Retreat",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
      reserved: true,
    },
    {
      id: 5,
      name: "Luxury Beach Villa",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
      reserved: false,
    },
    {
      id: 6,
      name: "Mountain Retreat",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
      reserved: false,
    },
    {
      id: 7,
      name: "Luxury Beach Villa",
      price: 250,
      images: ["/images/villa1.jpg", "/images/villa2.jpg"],
      reserved: true,
    },
    {
      id: 8,
      name: "Mountain Retreat",
      price: 300,
      images: ["/images/villa3.jpg", "/images/villa4.jpg"],
      reserved: false,
    },
  ],
  selectedVilla: null,
  setSelectedVilla: (villa) => set({ selectedVilla: villa }),
}));
