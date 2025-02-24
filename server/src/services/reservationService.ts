import moment from "moment";
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
  today: string
): Promise<ReservationChat[]> => {
  const startOfDay = moment(today, ["YYYY-MM-DD", "DD/MM/YYYY"], true).startOf(
    "day"
  );
  const endOfDay = moment(today, ["YYYY-MM-DD", "DD/MM/YYYY"], true).endOf(
    "day"
  );

  const reservations = await Reservation.find({
    startDate: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ startDate: 1 });

  return reservations.map((res) => ({
    villa: res.villa,
    date: res.startDate.toLocaleDateString("en-GB", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
    booked: true,
  }));
};

export const addReservation = async (
  reservationData: IReservation
): Promise<IReservation> => {
  const newReservation = new Reservation(reservationData);
  return await newReservation.save();
};
