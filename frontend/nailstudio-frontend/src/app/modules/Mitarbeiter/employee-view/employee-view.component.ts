import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarMitarbeiterComponent} from "../../../navigation/navbar-mitarbeiter/navbar-mitarbeiter.component";
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {TermineService} from '../../../services/termine.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, NavbarMitarbeiterComponent],
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  termine: any[] = [];
  datum: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private appointmentService: TermineService
  ) {
    this.datum = new Date().toISOString().split('T')[0]; // Aktuelles Datum im Format YYYY-MM-DD
  }

  ngOnInit(): void {
    this.loadTermine();
  }

  loadTermine() {
    const currentUser = this.authService.getCurrentUser();
    console.log('Aktueller Benutzer:', currentUser);
    console.log('Datum:', this.datum);
    if (currentUser && 'MitarbeiterID' in currentUser) {
      const mitarbeiterID = currentUser.MitarbeiterID;
      console.log('Anfrage an Endpoint:', `http://localhost:3000/api/termine/mitarbeiter/${mitarbeiterID}?datum=${this.datum}`);
      this.appointmentService.getAppointmentsByMitarbeiterID(mitarbeiterID, this.datum).subscribe({
        next: (data) => {
          console.log('Empfangene Daten:', data);
          this.termine = data.map(termin => ({
            ...termin,
            Dienstleistungen: termin.Dienstleistungen || {Bezeichnung: 'Unbekannt'},
            Mitarbeiter: termin.Mitarbeiter || {Name: 'Unbekannt'},
            Terminzeiten: termin.Terminzeiten || {Uhrzeit: 'Unbekannt'}
          }));
        },
        error: (error) => {
          console.error('Fehler beim Laden der Termine', error);
        }
      });
    }
  }
}
