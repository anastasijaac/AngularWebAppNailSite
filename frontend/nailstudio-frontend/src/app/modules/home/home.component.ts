import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navigation/navbar/navbar.component'; // Achte auf den korrekten relativen Pfad
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, // Grundlegendes Modul für Angular-Direktiven
    NavbarComponent, // Die Navbar, die als Sidebar dient
    MatButtonModule // Material Button Modul
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']); // Pfad zur Anmeldeseite
  }
}
