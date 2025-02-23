export interface Reservation {
  villa: string;
  client: string;
  phone: string;
  startDate: Date;
  endDate: Date | null;
}
