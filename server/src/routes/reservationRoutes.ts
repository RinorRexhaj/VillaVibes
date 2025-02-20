import express from "express";
import {
  getReservations,
  createReservation,
} from "../controllers/reservationController";

const router = express.Router();

router.get("/", getReservations);
router.post("/", createReservation);

export default router;
