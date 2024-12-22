import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  message = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstname: 'Youssef',
    };
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        this.message = 'Registration successful!';

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'Registration failed. Please try again.';
      },
    });
  }
}
