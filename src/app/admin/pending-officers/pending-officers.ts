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

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.admin.getPendingOfficers().subscribe({
      next: (res) => {
        this.officers = res;
      },
      error: (err) => {
        console.error(err);
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

