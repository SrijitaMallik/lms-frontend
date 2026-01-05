import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  api = 'http://localhost:5209/api/admin';

  constructor(private http:HttpClient) {}

  private authHeader(){
    const token = localStorage.getItem("token");
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
  }

  getPending(){
    return this.http.get<any[]>(`${this.api}/pending-officers`, this.authHeader());
  }

  approve(id:any){
    return this.http.put(`${this.api}/approve-officer/${id}`,{}, this.authHeader());
  }

  reject(id:any){
    return this.http.delete(`${this.api}/reject-officer/${id}`, this.authHeader());
  }
  getLoanStatus(){
    return this.http.get<any[]>(`${this.api}/reports/loans-by-status`);
  }

  getCustomerSummary(){
    return this.http.get<any[]>(`${this.api}/reports/customer-summary`);
  }

  getActiveVsClosed(){
    return this.http.get<any>(`${this.api}/reports/active-vs-closed`);
  }
  getPendingOfficers(){
  return this.http.get<any[]>('http://localhost:5209/api/admin/pending-officers');
}

}
