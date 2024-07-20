import {Component} from '@angular/core';
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {Router, RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar-mitarbeiter',
  standalone: true,
  templateUrl: './navbar-mitarbeiter.component.html',
  styleUrls: ['./navbar-mitarbeiter.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
})
export class NavbarMitarbeiterComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Navigiert zurück zur Startseite
  }
}
