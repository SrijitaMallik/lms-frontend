import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  constructor(private router: Router) {}

  forceNavigate(event: Event, path: string) {
    event.preventDefault();
    this.router.navigate([path]).then(() => {
      console.log('Navigation successful to:', path);
    }).catch(err => {
      console.error('Navigation failed:', err);
    });
  }
}