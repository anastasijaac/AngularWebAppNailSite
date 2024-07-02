import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DienstleistungenService } from '../../../services/dienstleistungen.service';
import { TermineService } from '../../../services/termine.service';
import { AuthService } from '../../../services/auth.service';
import { NavbarKundeComponent } from '../../../navigation/navbar-kunde/navbar-kunde.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule, FullCalendarModule, NavbarKundeComponent],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, AfterViewInit {
  calendarOptions: any;
  services: any[] = [];
  selectedService?: number;
  selectedDate?: string;
  selectedTime?: string;
  selectedEmployee?: any;
  availableTimes: { time: string, id: number }[] = [
    { time: '10:00', id: 1 },
    { time: '13:00', id: 2 },
    { time: '16:00', id: 3 }
  ];
  availableEmployees: any[] = [];
  filteredEmployees: any[] = [];

  constructor(
    private dienstleistungenService: DienstleistungenService,
    private appointmentService: TermineService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDienstleistungen();
    this.initializeCalendar();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.initializeCalendar();
    }
  }

  loadDienstleistungen() {
    this.dienstleistungenService.getAllDienstleistungen().subscribe({
      next: (data: any[]) => {
        this.services = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Dienstleistungen', error);
      }
    });
  }

  initializeCalendar() {
    if (typeof window !== 'undefined') {
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        height: 'auto',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: ''
        },
        dateClick: this.handleDateClick.bind(this),
        selectable: true,
        selectOverlap: false
      };
    }
  }

  handleDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.highlightSelectedDate(arg.dateStr);
    console.log(`Selected date: ${this.selectedDate}`);
  }

  selectTime(time: string) {
    this.selectedTime = time;
    console.log(`Selected time: ${this.selectedTime}`);
    this.loadAvailableEmployees();
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
    console.log(`Selected employee: ${this.selectedEmployee.Name}`);
  }

  loadAvailableEmployees() {
    if (this.selectedDate && this.selectedTime) {
      this.appointmentService.getAvailableAppointments(this.selectedDate).subscribe({
        next: (employees: any[]) => {
          console.log('Employees received:', employees);
          this.availableEmployees = employees;
          this.filterAvailableEmployees();
        },
        error: (error) => {
          console.error('Fehler beim Laden der verfügbaren Mitarbeiter', error);
        }
      });
    }
  }

  filterAvailableEmployees() {
    if (this.selectedTime) {
      const selectedTimeISO = `1970-01-01T${this.selectedTime}:00.000Z`; // Match the ISO format of employee time
      this.filteredEmployees = this.availableEmployees.filter(employee => employee.Terminzeit === selectedTimeISO);
      console.log('Filtered employees:', this.filteredEmployees);
    } else {
      this.filteredEmployees = [];
    }
  }

  highlightSelectedDate(dateStr: string) {
    const calendarApi = this.calendarOptions?.calendar?.getApi();
    if (calendarApi) {
      calendarApi.unselect(); // Clear previous selection
      calendarApi.select(dateStr);
    }
  }

  bookAppointment() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'kunde') {
      const customerId = currentUser.KundenID;

      if (this.selectedService && this.selectedDate && this.selectedTime && this.selectedEmployee) {
        const selectedTerminzeit = this.availableTimes.find(time => time.time === this.selectedTime)?.id;
        const appointmentData = {
          Datum: this.selectedDate,
          TerminzeitID: selectedTerminzeit,
          KundenID: customerId,
          MitarbeiterID: this.selectedEmployee.MitarbeiterID,
          DienstleistungsID: this.selectedService
        };

        console.log('Appointment data:', appointmentData); // Log the data before sending

        this.appointmentService.bookAppointment(appointmentData).subscribe({
          next: (response) => {
            alert('Termin erfolgreich gebucht!');
            this.router.navigate(['/appointment-status']);
          },
          error: (error) => {
            console.error('Fehler beim Buchen des Termins', error);
          }
        });
      } else {
        alert('Bitte wählen Sie eine Dienstleistung, ein Datum, eine Uhrzeit und einen Mitarbeiter aus.');
      }
    } else {
      alert('Bitte melden Sie sich zuerst an.');
    }
  }

  onServiceChange() {
    this.selectedDate = undefined;
    this.selectedTime = undefined;
    this.selectedEmployee = undefined;
    this.availableEmployees = [];
    this.filteredEmployees = [];
  }
}
