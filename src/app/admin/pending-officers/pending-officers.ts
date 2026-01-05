import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pending-officers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-officers.html',
  styleUrls: ['./pending-officers.css']
})
export class PendingOfficers {
  officers:any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.http.get<any[]>('https://localhost:7192/api/admin/pending-officers')
      .subscribe(res=>{
        this.officers = res;
      });
  }

  approve(id:number){
    this.http.put(`https://localhost:7192/api/admin/approve-officer/${id}`,{})
      .subscribe(()=>this.ngOnInit());
  }

  reject(id:number){
    this.http.delete(`https://localhost:7192/api/admin/reject-officer/${id}`)
      .subscribe(()=>this.ngOnInit());
  }

  load() {
    this.http.get<any[]>('https://localhost:7192/api/admin/pending-officers')
      .subscribe({
        next: res => this.officers = res,
        error: err => console.error(err)
      });
  }
}
