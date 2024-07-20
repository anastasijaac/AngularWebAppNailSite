import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarKundeComponent} from "../../../navigation/navbar-kunde/navbar-kunde.component";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, NavbarKundeComponent],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
}
