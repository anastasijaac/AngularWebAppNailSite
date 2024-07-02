import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarMitarbeiterComponent} from "../../../navigation/navbar-mitarbeiter/navbar-mitarbeiter.component";

@Component({
  selector: 'app-feedback-termin',
  standalone: true,
  imports: [CommonModule, NavbarMitarbeiterComponent],
  templateUrl: './feedback-termin.component.html',
  styleUrl: './feedback-termin.component.css'
})
export class FeedbackTerminComponent {
}
