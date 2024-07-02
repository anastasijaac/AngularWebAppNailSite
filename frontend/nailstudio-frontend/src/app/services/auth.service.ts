import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, Kunde, Mitarbeiter } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<Kunde | Mitarbeiter | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password });
  }

  getCurrentUser(): Kunde | Mitarbeiter | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    // Informiere den Server über die Abmeldung
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => console.log('Server erfolgreich über die Abmeldung informiert'),
      error: (error) => console.error('Fehler beim Abmelden auf dem Server', error)
    });
  }
}

export { Kunde, Mitarbeiter };
