import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DienstleistungenService {
  private apiUrl = `${environment.apiUrl}/dienstleistungen`;

  constructor(private http: HttpClient) {}

  getAllDienstleistungen(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
