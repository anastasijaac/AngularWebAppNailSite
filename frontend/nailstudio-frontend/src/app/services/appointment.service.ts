import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/termine';

  constructor(private http: HttpClient) {}

  getAvailableAppointments(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available-employees?datum=${date}`);
  }

  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, appointmentData);
  }

  getAppointmentsByMitarbeiterID(mitarbeiterID: number, datum: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mitarbeiter/${mitarbeiterID}?datum=${datum}`);
  }
}
