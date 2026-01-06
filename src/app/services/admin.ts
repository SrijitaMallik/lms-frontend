import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AdminService{
 api='http://localhost:5209/api/admin';
 constructor(private http:HttpClient){}

 getPendingOfficers(){ return this.http.get<any[]>(`${this.api}/pending-officers`); }
 approveOfficer(id:number){ return this.http.put(`${this.api}/approve-officer/${id}`,{}); }
 rejectOfficer(id:number){ return this.http.delete(`${this.api}/reject-officer/${id}`); }

 getVerifiedLoans(){ return this.http.get<any[]>(`${this.api}/verified-loans`); }
 approveLoan(id:number){ return this.http.put(`${this.api}/approve-loan/${id}`,{}); }
 rejectLoan(id:number){ return this.http.put(`${this.api}/reject-loan/${id}`,{}); }

 getLoanStatus(){ return this.http.get<any[]>(`${this.api}/reports/loans-by-status`); }
 getActiveVsClosed(){ return this.http.get<any>(`${this.api}/reports/active-vs-closed`); }
 getCustomerSummary(){ return this.http.get<any[]>(`${this.api}/reports/customer-summary`); }

 getLoanTypes(){ return this.http.get<any[]>(`${this.api}/loan-types`); }
 getLoanType(id:number){ return this.http.get<any>(`${this.api}/loan-types/${id}`); }
 updateLoanType(id:number,body:any){ return this.http.put(`${this.api}/loan-types/${id}`,body); }
 disableLoanType(id:number){
  return this.http.delete(`${this.api}/loan-types/${id}`);
}
addLoanType(body:any){
  return this.http.post(`${this.api}/loan-types`, body);
}


}
