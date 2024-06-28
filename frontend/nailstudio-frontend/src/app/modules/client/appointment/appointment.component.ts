import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DienstleistungenService } from '../../../services/dienstleistungen.service';
import { NavbarKundeComponent } from '../../../navigation/navbar-kunde/navbar-kunde.component';

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

  constructor(private dienstleistungenService: DienstleistungenService) {}

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
        height: 'auto', // Setzen Sie die Höhe des Kalenders automatisch
        dateClick: this.handleDateClick.bind(this),
      };
    }
  }

  handleDateClick(arg: any) {
    console.log('date click! ', arg.dateStr);
  }
}
