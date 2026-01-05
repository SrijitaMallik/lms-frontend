import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerDashboardService } from '../../services/customer-dashboard';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-loans.html',
  styleUrls: ['./my-loans.css']
})
export class MyLoansComponent implements OnInit {

  loans: any[] = [];
  isLoading = false;

  constructor(private service: CustomerDashboardService, public router: Router) {}

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    this.isLoading = true;
    this.service.getMyLoans().subscribe({
      next: (res: any) => {
        this.loans = res;
        console.log('My loans loaded:', res);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load loans:', err);
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/customer-dashboard']);
  }
}


