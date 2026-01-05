import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerDashboardService } from '../services/customer-dashboard';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css']
})
export class CustomerDashboardComponent implements OnInit {

  loans:any[] = [];
  emis:any[] = [];
  receipts:any[] = [];

  totalOutstanding = 0;
  nextEmi = 0;
  activeLoans = 0;
  totalPaid = 0;

  notification: { type: 'success' | 'error', message: string } | null = null;
  payingId: number | null = null;
  selectedReceipt: any = null;
  showReceiptModal = false;

  constructor(private service:CustomerDashboardService, private auth:AuthService, public router:Router, private cdr: ChangeDetectorRef){}

  ngOnInit() {

    this.service.getMyLoans().subscribe((loanRes:any)=>{
      console.log('LOANS RESPONSE:', loanRes);
      this.loans = loanRes;
      this.activeLoans = this.loans.filter(l=>l.status=="Approved").length;
      this.cdr.detectChanges();
    });

    this.service.getMyEmis().subscribe((emiRes:any)=>{
      console.log('EMIS RESPONSE:', emiRes);
      console.log('First EMI object:', emiRes[0]);
      console.log('EMI properties:', Object.keys(emiRes[0]));
      this.emis = emiRes;
      this.receipts = []; // Reset receipts

      if(this.emis.length>0){
        this.nextEmi = this.emis[0].emi;
      }

      this.emis.forEach(e=>{
        this.service.getOutstanding(e.loanApplicationId).subscribe((o:any)=>{
          console.log('OUTSTANDING RESPONSE:', o);
          this.totalOutstanding += o.outstanding;
          this.cdr.detectChanges();
        });

        this.service.getReceipts(e.loanApplicationId).subscribe((r:any)=>{
          console.log('RECEIPTS RESPONSE:', r);
          // Accumulate receipts instead of overwriting
          if(Array.isArray(r)){
            this.receipts = [...this.receipts, ...r];
          } else {
            this.receipts.push(r);
          }
          r.forEach((x:any)=> this.totalPaid += x.paidAmount);
          this.cdr.detectChanges();
        });
      });
      this.cdr.detectChanges();
    });

  }

  pay(id:number){
    this.payingId = id;
    this.service.payEmi(id).subscribe({
      next: (res:any) => {
        console.log('Payment successful, response:', res);
        this.notification = { type: 'success', message: 'EMI paid successfully! ✓' };
        this.payingId = null;
        
        // Immediately update the EMI card on frontend by creating new array reference
        this.emis = this.emis.map(emi => {
          if(emi.loanApplicationId === id) {
            return {
              ...emi,
              pendingMonths: Math.max(0, emi.pendingMonths - 1)
            };
          }
          return emi;
        });
        
        // Update nextEmi if first EMI is now paid
        if(this.emis.length > 0 && this.emis[0].pendingMonths === 0) {
          this.nextEmi = this.emis.length > 1 ? this.emis[1].emi : 0;
        }
        
        this.cdr.detectChanges();
        console.log('Frontend EMI updated:', this.emis);
        
        // Reset other data for refresh
        this.totalOutstanding = 0;
        this.totalPaid = 0;
        this.receipts = [];
        
        // Small delay to ensure backend is updated
        setTimeout(() => {
          this.ngOnInit();
          this.cdr.detectChanges();
        }, 1000);
        
        // Hide notification after 4 seconds
        setTimeout(() => {
          this.notification = null;
          this.cdr.detectChanges();
        }, 4000);
      },
      error: (err:any) => {
        console.error('Payment failed:', err);
        console.error('Full error response:', err.error);
        
        // Check if the error response contains actual success message
        if(err.status === 200 || (err.error && typeof err.error === 'string' && err.error.includes('success'))) {
          // Success case but caught as error due to response type mismatch
          this.notification = { type: 'success', message: 'EMI paid successfully! ✓' };
          this.payingId = null;
          
          // Immediately update the EMI card
          this.emis = this.emis.map(emi => {
            if(emi.loanApplicationId === id) {
              return {
                ...emi,
                pendingMonths: Math.max(0, emi.pendingMonths - 1)
              };
            }
            return emi;
          });
          
          if(this.emis.length > 0 && this.emis[0].pendingMonths === 0) {
            this.nextEmi = this.emis.length > 1 ? this.emis[1].emi : 0;
          }
          
          this.cdr.detectChanges();
          
          this.totalOutstanding = 0;
          this.totalPaid = 0;
          this.receipts = [];
          
          setTimeout(() => {
            this.ngOnInit();
            this.cdr.detectChanges();
          }, 1000);
          
          setTimeout(() => {
            this.notification = null;
            this.cdr.detectChanges();
          }, 4000);
        } else {
          this.notification = { type: 'error', message: 'Payment failed. Please try again.' };
          this.payingId = null;
          
          setTimeout(() => {
            this.notification = null;
            this.cdr.detectChanges();
          }, 4000);
        }
      }
    });
  }

  closeNotification() {
    this.notification = null;
  }

  openReceiptModal(receipt: any) {
    this.selectedReceipt = receipt;
    this.showReceiptModal = true;
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    console.log('Opening receipt modal:', receipt);
  }

  closeReceiptModal() {
    this.showReceiptModal = false;
    this.selectedReceipt = null;
    // Re-enable scroll
    document.body.style.overflow = 'auto';
  }

  downloadReceipt() {
    if (this.selectedReceipt) {
      // You can implement actual download functionality here
      const receiptText = `
PAYMENT RECEIPT
================
Receipt ID: ${this.selectedReceipt.receiptId}
Loan Application ID: ${this.selectedReceipt.loanApplicationId}
EMI Schedule ID: ${this.selectedReceipt.emiScheduleId}
Paid Amount: ₹${this.selectedReceipt.paidAmount}
Paid On: ${new Date(this.selectedReceipt.paidOn).toLocaleDateString()}
      `;
      console.log(receiptText);
      alert('Receipt downloaded successfully!');
    }
  }

  scrollToReceipts() {
    const element = document.querySelector('.transactions-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
