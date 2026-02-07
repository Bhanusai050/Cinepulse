import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Please enter email and password.';
      return;
    }

    this.auth.signIn(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.error = 'Sign in failed. Try again.'
    });
  }
}
