import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
 selector:'app-loan-types',
 standalone:true,
 imports:[CommonModule,FormsModule],
 templateUrl:'./loan-types.html',
 styleUrls:['./loan-types.css']
})
export class LoanTypes implements OnInit{

 loanTypes:any[]=[];
 editData:any=null;
 showAdd=false;
saving = false;
creating = false;

 newLoan:any={
   loanTypeName:'',
   interestRate:0,
   minAmount:0,
   maxAmount:0,
   maxTenureMonths:0
 };

 constructor(private admin:AdminService, private zone:NgZone, private cdr:ChangeDetectorRef){}


 ngOnInit(){ this.load(); }

 load(){
  this.admin.getLoanTypes().subscribe(res=> this.loanTypes=res);
 }

 edit(l:any){
  this.editData={...l};
 }

 openAdd(){
  this.showAdd=true;
 }

 save(){
  if(this.saving) return;
  this.saving = true;

  const data = {...this.editData};
  this.editData = null;      // close popup instantly
  this.cdr.detectChanges();

  this.admin.updateLoanType(data.loanTypeId, data).subscribe(()=>{
    // 🔥 wait 200ms for DB commit
    setTimeout(() => {
      this.load();
      this.saving = false;
    }, 200);
  });
}

 create(){
  if(this.creating) return;

  if(
    !this.newLoan.loanTypeName ||
    this.newLoan.interestRate <= 0 ||
    this.newLoan.minAmount <= 0 ||
    this.newLoan.maxAmount <= 0 ||
    this.newLoan.maxTenureMonths <= 0
  ){
    alert("Fill all fields correctly");
    return;
  }

  const data = {...this.newLoan};
  this.showAdd = false;        // close popup instantly
  this.cdr.detectChanges();

  this.admin.addLoanType(data).subscribe(()=>{
    setTimeout(() => {
      this.newLoan={loanTypeName:'',interestRate:0,minAmount:0,maxAmount:0,maxTenureMonths:0};
      this.load();
      this.creating = false;
    }, 200);
  });
}


disable(id:number){
  this.loanTypes=this.loanTypes.filter(x=>x.loanTypeId!==id);
  this.admin.disableLoanType(id).subscribe();
 }

 cancel(){
   this.editData=null;
   this.showAdd=false;
 }
}
