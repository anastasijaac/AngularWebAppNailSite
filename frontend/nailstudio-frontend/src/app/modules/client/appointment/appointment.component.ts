import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DienstleistungenService } from '../../../services/dienstleistungen.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule, FullCalendarModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  calendarOptions: any;
  services: any[] = [];
  selectedService?: number;

  constructor(private dienstleistungenService: DienstleistungenService) {}

  ngOnInit() {
    this.loadDienstleistungen();
    this.initializeCalendar();
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
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
    };
  }

  handleDateClick(arg: any) {
    console.log('date click! ', arg.dateStr);
  }
}
