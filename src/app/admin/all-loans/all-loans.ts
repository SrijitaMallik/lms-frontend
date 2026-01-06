import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';

@Component({
 selector:'app-all-loans',
 standalone:true,
 imports:[CommonModule],
 templateUrl:'./all-loans.html',
 styleUrls:['./all-loans.css']
})
export class AllLoansComponent implements OnInit{

 loans:any[]=[];

 constructor(private admin:AdminService){}

 ngOnInit(){ this.load(); }

 load(){ this.admin.getVerifiedLoans().subscribe(res=>this.loans=res); }

 approve(id:number){ this.admin.approveLoan(id).subscribe(()=>this.load()); }
 reject(id:number){ this.admin.rejectLoan(id).subscribe(()=>this.load()); }
}
