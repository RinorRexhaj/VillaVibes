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
    const { date } = req.query;

    if (!date) {
      const reservations = await fetchReservations(new Date().toISOString());
      res.json(reservations);
    } else {
      const reservations = await fetchReservations(date as string);
      res.json(reservations);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

export const createReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { villa, startDate } = req.body;

    if (!villa || !startDate) {
      res.status(400).json({ message: "Villa and startDate are required" });
      return;
    }

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];

    const existingReservations = await fetchReservations(formattedStartDate);

    const isReserved = existingReservations.some((res) => res.villa === villa);

    if (isReserved) {
      res.status(403).json({
        message:
          "Reservation not allowed: Villa is already booked on this date",
      });
      return;
    }

    const newReservation = await addReservation(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: "Error creating reservation", error });
  }
};
