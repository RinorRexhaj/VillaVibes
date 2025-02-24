import { getReservationsOnDate } from "../services/reservationService";
import { ReservationChat } from "../types/ReservationChat";

const reservationCache: { [key: string]: ReservationChat[] } = {};

export const getCachedReservationsOnDate = async (date: string) => {
  if (reservationCache[date]) {
    return reservationCache;
  }
  const reservations = await getReservationsOnDate(date);
  reservationCache[date] = reservations;
  console.log("-----------------");
  console.log(date);
  return reservations;
};
