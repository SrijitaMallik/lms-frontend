import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';

@Component({
 standalone:true,
 selector:'app-customers',
 imports:[CommonModule],
 templateUrl:'./customer.html'
})
export class CustomersComponent{
 customers:any[]=[];
 constructor(private admin:AdminService){
   this.admin.getCustomerSummary().subscribe(res=>this.customers=res);
 }
}
