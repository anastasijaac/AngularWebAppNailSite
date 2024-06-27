import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Bitte füllen Sie alle Felder aus.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwörter stimmen nicht überein.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Passwort muss mindestens 6 Zeichen lang sein.';
      return;
    }

    if (!this.emailIsValid(this.email)) {
      this.errorMessage = 'Ungültige E-Mail-Adresse.';
      return;
    }

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registrierung erfolgreich', response);
        this.successMessage = "You're now a Swan member!";
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Registrierung fehlgeschlagen', error);
        this.errorMessage = 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  emailIsValid(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
