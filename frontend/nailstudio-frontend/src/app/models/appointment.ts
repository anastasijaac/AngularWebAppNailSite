//Ein Model für Termindaten, das Dinge wie Zeit, Datum, beteiligte Dienstleistungen und teilnehmende Personen beinhalten könnte.
export interface Appointment {
  id: number;
  time: string;
  date: string;
  customerId: number;
  employeeId: number;
  serviceId: number;
}
