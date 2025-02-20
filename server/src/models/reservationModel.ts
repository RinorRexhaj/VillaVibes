import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  villa: string;
  client: string;
  phone: string;
  startDate: Date;
  endDate: Date;
}

const ReservationSchema: Schema = new Schema(
  {
    villa: { type: String, required: true },
    client: { type: String, required: true },
    phone: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const Reservation = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);
export default Reservation;
