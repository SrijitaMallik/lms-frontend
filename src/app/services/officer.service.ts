import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OfficerService {

  api = 'http://localhost:5209/api/officer';

  constructor(private http: HttpClient) {}

  getPendingLoans(){
    return this.http.get<any[]>(`${this.api}/pending`);
  }

  approveLoan(id:number){
    return this.http.put(`${this.api}/approve/${id}`, {});
  }

  rejectLoan(id:number){
    return this.http.put(`${this.api}/reject/${id}`, {});
  }

  getLoanHistory(){
    return this.http.get<any[]>(`${this.api}/loan-history`);
  }
  getStats(){
  return this.http.get<any>(`${this.api}/stats`);
}

}
