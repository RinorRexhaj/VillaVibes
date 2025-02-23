import Reservation, { IReservation } from "../models/reservationModel";
import { ReservationChat } from "../types/ReservationChat";

export const fetchReservations = async (
  date: string
): Promise<IReservation[]> => {
  const formattedDate = new Date(date).toISOString().split("T")[0];

  return await Reservation.find({
    startDate: {
      $gte: new Date(formattedDate),
    },
  });
};

export const getReservationsOnDate = async (
  date: string
): Promise<ReservationChat[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const reservations = await Reservation.find({
    startDate: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ startDate: 1 });

  return reservations.map((res) => ({
    villa: res.villa,
    date: date,
    booked: true,
  }));
};

export const addReservation = async (
  reservationData: IReservation
): Promise<IReservation> => {
  const newReservation = new Reservation(reservationData);
  return await newReservation.save();
};
