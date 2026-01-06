import { Component, OnInit } from '@angular/core';
import { OfficerService } from '../services/officer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-officer-reports',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./officer-reports.html',
  styleUrls:['./officer-reports.css']
})
export class OfficerReportsComponent implements OnInit {

  allLoans:any[] = [];
  loans:any[] = [];

  page = 1;
  pageSize = 5;
  totalPages = 1;

  searchText = '';
  statusFilter = '';

  constructor(private service: OfficerService) {}

  ngOnInit(){
    this.load();
  }

  load(){
    this.service.getLoanHistory().subscribe(res=>{
      this.allLoans = res;
      this.applyFilter();
    });
  }

  applyFilter(){
    this.loans = this.allLoans.filter(l=>{
      const matchName = !this.searchText || (l.customerName||'').toLowerCase().includes(this.searchText.toLowerCase());
      const matchStatus = !this.statusFilter || l.status === this.statusFilter;
      return matchName && matchStatus;
    });

    this.totalPages = Math.ceil(this.loans.length / this.pageSize);
    this.changePage(1);
  }

  clearFilter(){
    this.searchText='';
    this.statusFilter='';
    this.applyFilter();
  }

  get pagedLoans(){
    const start = (this.page-1)*this.pageSize;
    return this.loans.slice(start,start+this.pageSize);
  }

  changePage(p:number){ this.page=p; }
  nextPage(){ if(this.page<this.totalPages) this.page++; }
  prevPage(){ if(this.page>1) this.page--; }
}
