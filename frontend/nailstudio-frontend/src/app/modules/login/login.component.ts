import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importiere RouterModule
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../models/auth-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]  // Stelle sicher, dass RouterModule importiert wird
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    console.log('Login attempt - Email:', this.email); // Debugging
    console.log('Login attempt - Password:', this.password); // Debugging

    this.authService.login(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        console.log('Login erfolgreich', response);

        // Hier je nach Benutzerrolle zur richtigen Seite navigieren
        if (response.kunde) {
          this.router.navigate(['/appointment']);
        } else {
          this.router.navigate(['/employee-view']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login fehlgeschlagen', error);
      }
    });
  }


  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
