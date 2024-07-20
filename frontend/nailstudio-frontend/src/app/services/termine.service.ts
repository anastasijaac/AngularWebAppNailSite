import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermineService {
  private apiUrl = 'http://localhost:3000/api/termine';

  constructor(private http: HttpClient) { }

  getAvailableAppointments(datum: string, terminzeitID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available-employees`, {
      params: { Datum: datum, TerminzeitID: terminzeitID.toString() }
    });
  }

  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, appointmentData);
  }

  getAppointmentsByMitarbeiterID(mitarbeiterID: number, datum: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mitarbeiter/${mitarbeiterID}?datum=${datum}`);
  }

  // Methode zur Überprüfung der Terminverfügbarkeit hinzufügen
  checkAppointmentAvailability(date: string, timeId: number, customerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-availability`, {
      params: { Datum: date, TerminzeitID: timeId.toString(), KundenID: customerId.toString() }
    });
  }

}
