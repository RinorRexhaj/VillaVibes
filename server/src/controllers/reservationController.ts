import { Request, Response } from "express";
import {
  fetchReservations,
  addReservation,
} from "../services/reservationService";

export const getReservations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const Reservations = await fetchReservations();
    res.json(Reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Reservations", error });
  }
};

export const createReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newReservation = await addReservation(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: "Error creating Reservation", error });
  }
};
