import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/appointments';

  constructor(private http: HttpClient) {}

  getAvailableAppointments(date: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/available?date=${date}`);
  }

  bookAppointment(appointmentData: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/book`, appointmentData);
  }
}
