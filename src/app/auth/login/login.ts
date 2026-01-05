import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(form: NgForm){
  this.auth.login(form.value).subscribe(res => {

    this.auth.saveLogin(res.token);

    const role = this.auth.getRole();

    if(role === 'Admin'){
      this.router.navigate(['/admin']);
    }
    else if(role === 'LoanOfficer'){
      this.router.navigate(['/officer']);
    }
    else{
      this.router.navigate(['/customer']);
    }
  });
}


  goRegister() {
    this.router.navigate(['/register']);
  }
}
