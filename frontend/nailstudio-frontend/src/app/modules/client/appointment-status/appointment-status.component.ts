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
  filteredTermine: any[] = [];
  filter: string = 'all';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTermine();
  }

  loadTermine() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && 'KundenID' in currentUser) {
      const kundenID = currentUser.KundenID;
      this.http.get<any[]>(`http://localhost:3000/api/termine/kunde/${kundenID}`).subscribe({
        next: (data) => {
          console.log('Daten vom Backend:', data);
          this.termine = data.map(termin => ({
            ...termin,
            Dienstleistungen: termin.Dienstleistungen || { Bezeichnung: 'Unbekannt' },
            Mitarbeiter: termin.Mitarbeiter || { Name: 'Unbekannt' },
            Terminzeiten: termin.Terminzeiten || { Uhrzeit: 'Unbekannt' }
          }));
          this.filterAppointments(this.filter); // Apply initial filter
        },
        error: (error) => {
          console.error('Fehler beim Laden der Termine', error);
        }
      });
    }
  }

  filterAppointments(filter: string) {
    this.filter = filter;
    const now = new Date();
    console.log('Aktuelle Zeit im Frontend:', now);

    if (filter === 'upcoming') {
      this.filteredTermine = this.termine.filter(termin => {
        const terminDate = new Date(termin.Datum);
        const [hours, minutes] = termin.Terminzeiten?.Uhrzeit.split(':').map(Number);
        const terminDateTime = new Date(terminDate.getFullYear(), terminDate.getMonth(), terminDate.getDate(), hours, minutes);
        console.log('Prüfe Termin (anstehend):', terminDateTime, '>=', now);
        return terminDateTime >= now;
      });
    } else if (filter === 'past') {
      this.filteredTermine = this.termine.filter(termin => {
        const terminDate = new Date(termin.Datum);
        const [hours, minutes] = termin.Terminzeiten?.Uhrzeit.split(':').map(Number);
        const terminDateTime = new Date(terminDate.getFullYear(), terminDate.getMonth(), terminDate.getDate(), hours, minutes);
        console.log('Prüfe Termin (vergangen):', terminDateTime, '<', now);
        return terminDateTime < now;
      });
    } else {
      this.filteredTermine = this.termine;
    }

    console.log('Gefilterte Termine:', this.filteredTermine);
  }
}
