import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-types.html',
  styleUrls: ['./loan-types.css']
})
export class LoanTypes implements OnInit {

  loanTypes: any[] = [];

  editLoan: any = null;            
  editingId: number | null = null; 

  private api = 'http://localhost:5209/api/admin';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLoanTypes();
  }

  loadLoanTypes() {
    this.http.get<any[]>(`${this.api}/loan-types`).subscribe({
      next: res => this.loanTypes = res,
      error: err => console.error(err)
    });
  }

  openEdit(l: any) {
    this.editingId = l.loanTypeId;
    this.editLoan = { ...l };   // clone to avoid direct table binding
  }

  closeModal() {
  this.editLoan = null;
  this.editingId = null;
}

 updateLoanType() {
  if (!this.editingId) return;

  const payload = {
    loanTypeName: this.editLoan.loanTypeName,
    interestRate: this.editLoan.interestRate,
    minAmount: this.editLoan.minAmount,
    maxAmount: this.editLoan.maxAmount,
    maxTenureMonths: this.editLoan.maxTenureMonths
  };

  this.http.put(`${this.api}/loan-types/${this.editingId}`, payload)
    .subscribe({
      next: () => {
        alert("Loan Type Updated Successfully");
        this.closeModal();     // ← closes popup
        this.loadLoanTypes();  // ← refreshes table
      },
      error: err => console.error(err)
    });
}
}
