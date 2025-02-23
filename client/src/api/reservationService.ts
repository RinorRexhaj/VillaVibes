import axios from "axios";
import { Reservation } from "../types/Reservation";
import { environment } from "../environment/environment";

const API_BASE_URL = environment.apiUrl + "/reservations";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const reservationService = {
  getReservations: async (date: Date): Promise<Reservation[]> => {
    const response = await api.get<Reservation[]>("?date=" + date);
    return response.data;
  },
  createReservation: async (data: Reservation): Promise<Reservation> => {
    const response = await api.post<Reservation>("/", data);
    return response.data;
  },
};
