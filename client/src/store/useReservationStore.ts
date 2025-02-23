import { create } from "zustand";
import { reservationService } from "../api/reservationService";
import { Reservation } from "../types/Reservation";

type ReservationState = {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
  fetchReservations: (date: Date) => void;
  addReservation: (newReservation: Reservation) => void;
};

export const useReservationStore = create<ReservationState>((set) => ({
  reservations: [],
  loading: false,
  error: null,

  fetchReservations: (date) => {
    set({ loading: true, error: null });
    reservationService
      .getReservations(date)
      .then((response) => {
        set({ reservations: response, loading: false, error: null });
      })
      .catch(() =>
        set({ loading: false, error: "Failed to fetch reservations" })
      );
  },

  addReservation: (newReservation) => {
    set((state) => ({
      reservations: [...state.reservations, newReservation],
    }));
    reservationService
      .createReservation(newReservation)
      .then((createdReservation) => {
        set((state) => ({
          reservations: state.reservations.map((res) =>
            res === newReservation ? createdReservation : res
          ),
        }));
      })
      .catch(() => {
        set((state) => ({
          reservations: state.reservations.filter(
            (res) => res !== newReservation
          ),
          error: "Failed to add reservation",
        }));
      });
  },
}));
