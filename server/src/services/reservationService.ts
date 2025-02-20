import Reservation, { IReservation } from "../models/reservationModel";

export const fetchReservations = async (): Promise<IReservation[]> => {
  return await Reservation.find();
};

export const addReservation = async (
  ReservationData: IReservation
): Promise<IReservation> => {
  const newReservation = new Reservation(ReservationData);
  return await newReservation.save();
};
