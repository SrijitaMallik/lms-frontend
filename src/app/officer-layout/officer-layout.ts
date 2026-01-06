import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-officer-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './officer-layout.html',
  styleUrls: ['./officer-layout.css']
})
export class OfficerLayoutComponent {

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
