import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    console.log('Registrierung attempt - Name:', this.name);
    console.log('Registrierung attempt - Email:', this.email);
    console.log('Registrierung attempt - Passwort:', this.password);

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registrierung erfolgreich', response);
        this.router.navigate(['/appointment']);
      },
      error: (error) => {
        console.error('Registrierung fehlgeschlagen', error);
      }
    });
  }
}
