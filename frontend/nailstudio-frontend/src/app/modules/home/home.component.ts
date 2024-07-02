import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';
import { NavbarComponent } from '../../navigation/navbar/navbar.component'; // Achte auf den korrekten relativen Pfad
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PhotoGalleryComponent, NavbarComponent, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']); // Pfad zur Anmeldeseite
  }
}
