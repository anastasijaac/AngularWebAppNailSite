import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarKundeComponent } from '../../../navigation/navbar-kunde/navbar-kunde.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-appointment-status',
  standalone: true,
  imports: [CommonModule, NavbarKundeComponent],
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.css']
})
export class AppointmentStatusComponent implements OnInit {
  termine: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadTermine();
  }

  loadTermine() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && 'KundenID' in currentUser) {
      const kundenID = currentUser.KundenID;
      this.http.get<any[]>(`http://localhost:3000/api/termine/kunde/${kundenID}`).subscribe({
        next: (data) => {
          this.termine = data.map(termin => ({
            ...termin,
            Dienstleistungen: termin.Dienstleistungen || { Bezeichnung: 'Unbekannt' },
            Mitarbeiter: termin.Mitarbeiter || { Name: 'Unbekannt' },
            Terminzeiten: termin.Terminzeiten || { Uhrzeit: 'Unbekannt' }
          }));
        },
        error: (error) => {
          console.error('Fehler beim Laden der Termine', error);
        }
      });
    }
  }
}
