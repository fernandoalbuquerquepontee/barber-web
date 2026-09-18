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

export interface CreateAppointmentInput {
  serviceId: string;
  userId: string;
  barberId: string;
  date: string;
  hour: string;
  status: string;
}
