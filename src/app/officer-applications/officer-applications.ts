import { Component, OnInit } from '@angular/core';
import { OfficerService } from '../services/officer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-officer-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './officer-applications.html',
  styleUrls: ['./officer-applications.css']
})
export class OfficerApplicationsComponent implements OnInit {

  allLoans:any[] = [];
  loans:any[] = [];

  page = 1;
  pageSize = 5;
  totalPages = 1;

  searchText = '';
  statusFilter = '';

  constructor(private service: OfficerService) {}

  ngOnInit() {
    this.load();
  }

  load(){
    this.service.getPendingLoans().subscribe(res=>{
      this.allLoans = res;
      this.applyFilter();
    });
  }

  applyFilter(){
    this.loans = this.allLoans.filter(l=>{
      const matchStatus = !this.statusFilter || l.status === this.statusFilter;
      const matchSearch = !this.searchText || (l.customerName||'').toLowerCase().includes(this.searchText.toLowerCase());
      return matchStatus && matchSearch;
    });

    this.totalPages = Math.ceil(this.loans.length / this.pageSize);
    this.changePage(1);
  }

  get pagedLoans(){
    const start = (this.page-1)*this.pageSize;
    return this.loans.slice(start,start+this.pageSize);
  }

  changePage(p:number){ this.page = p; }
  nextPage(){ if(this.page < this.totalPages) this.page++; }
  prevPage(){ if(this.page > 1) this.page--; }

  approve(id:number){
    this.service.approveLoan(id).subscribe(()=>{
      alert("Loan Approved");
      this.load();
    });
  }

  reject(id:number){
    this.service.rejectLoan(id).subscribe(()=>{
      alert("Loan Rejected");
      this.load();
    });
  }
}
