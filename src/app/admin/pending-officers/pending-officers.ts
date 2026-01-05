import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-pending-officers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-officers.html',
  styleUrls: ['./pending-officers.css']
})
export class PendingOfficers implements OnInit {

  officers: any[] = [];
  loading: boolean = true; // ✅ ADD THIS

  constructor(private admin: AdminService) {
    console.log('PendingOfficers constructor');
  }

  ngOnInit(): void {
    console.log('PendingOfficers ngOnInit');
    this.load();
  }

  load() {
    this.loading = true; // ✅ ADD THIS
    this.admin.getPendingOfficers().subscribe({
      next: (res) => {
        console.log('Officers loaded:', res); // ✅ ADD THIS
        this.officers = res;
        this.loading = false; // ✅ ADD THIS
      },
      error: (err) => {
        console.error(err);
        this.loading = false; // ✅ ADD THIS
      }
    });
  }

  approve(id: number) {
    this.admin.approveOfficer(id).subscribe(() => {
      alert("Officer Approved");
      this.load();
    });
  }

  reject(id: number) {
    this.admin.rejectOfficer(id).subscribe(() => {
      alert("Officer Rejected");
      this.load();
    });
  }
}