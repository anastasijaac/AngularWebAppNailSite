import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarKundeComponent} from "../../../navigation/navbar-kunde/navbar-kunde.component";

@Component({
  selector: 'app-appointment-status',
  standalone: true,
    imports: [CommonModule, NavbarKundeComponent],
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.css']
})
export class AppointmentStatusComponent {}
