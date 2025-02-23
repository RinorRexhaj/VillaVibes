import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import reservationRoutes from "./routes/reservationRoutes";
import chatRoutes from "./routes/chatRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/reservations", reservationRoutes);
app.use("/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
