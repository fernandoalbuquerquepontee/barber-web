export interface Appointment {
  id: string;
  serviceId: string;
  userId: string;
  date: Date;
  status: string;
  service: {
    name: string;
  };
  barber: {
    name: string;
  };
}
