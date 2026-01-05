import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './admin/dashboard/dashboard';
import { PendingOfficers } from './admin/pending-officers/pending-officers';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register},
  { path: 'admin', component: Dashboard },
  { path: 'admin/pending-officers', component: PendingOfficers },

  { path: '', redirectTo: 'admin', pathMatch: 'full' }
];
