import {Component} from '@angular/core';
import {RouterOutlet, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navigation/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Grundlegendes Modul für NG-Inhalte
    RouterModule, // Modul für die Router-Verwaltung
    RouterOutlet, // Directive für Router-Outlets
    NavbarComponent // Füge deine Navbar hinzu
  ]
})
export class AppComponent {
  title = 'Nagelstudio';
}
