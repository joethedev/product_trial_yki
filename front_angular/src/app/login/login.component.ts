import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService
      .loginUser({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          const { accessToken, refreshToken } = response;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
  }
}
