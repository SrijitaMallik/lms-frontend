import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './admin/dashboard/dashboard';
import { PendingOfficers } from './admin/pending-officers/pending-officers';
import { AdminLayout } from './admin/layout/admin-layout/admin-layout';
import { LoanTypes } from './admin/loan-types/loan-types';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard';
import { ApplyLoanComponent } from './customer-dashboard/apply-loan/apply-loan';
import { MyLoansComponent } from './customer-dashboard/my-loans/my-loans';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'pending-officers', component: PendingOfficers },
      { path: 'loan-types', component: LoanTypes }   // ✅ ADD THIS
    ]
  },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'apply-loan', component: ApplyLoanComponent },
  { path: 'my-loans', component: MyLoansComponent }
];
