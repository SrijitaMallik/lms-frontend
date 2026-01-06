import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';

@Component({
  selector:'app-customer',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./customer.html',
  styleUrls:['./customer.css']
})
export class CustomersComponent implements OnInit {

  customers:any[]=[];
  filtered:any[]=[];

  page = 1;
  pageSize = 5;
  search = '';

  constructor(private admin:AdminService){}

  ngOnInit(){
    this.admin.getCustomerSummary().subscribe(res=>{
      this.customers = res;
      this.applyFilter();
    });
  }

  applyFilter(){
    const t = this.search.toLowerCase();
    this.filtered = this.customers.filter(x =>
      x.customerId.toString().includes(t)
    );
    this.page = 1;
  }

  get paged(){
  const start = (this.page-1)*this.pageSize;
  return this.filtered.slice(start, start + this.pageSize);
}

get totalPages(){
  return Math.ceil(this.filtered.length / this.pageSize) || 1;
}

}
