import { create } from "zustand";

interface ClientState {
  name: string;
  phone: string;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
}

export const useClientStore = create<ClientState>((set) => ({
  name: "",
  phone: "",
  setName: (name) => set({ name: name }),
  setPhone: (phone) => set({ phone: phone }),
}));
