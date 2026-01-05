import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  role = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      fullName: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe(() => {
      alert('Registered successfully');
      this.router.navigate(['/']);
    });
  }
  
  goLogin() {
    this.router.navigate(['/']);
  }
}
