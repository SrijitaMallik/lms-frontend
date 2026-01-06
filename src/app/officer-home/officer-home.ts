import { Component, OnInit } from '@angular/core';
import { OfficerService } from '../services/officer.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-officer-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './officer-home.html',
  styleUrls: ['./officer-home.css']
})
export class OfficerHomeComponent implements OnInit {

  stats:any = {};

  constructor(private service: OfficerService) {}

  ngOnInit(){
  this.service.getStats().subscribe({
    next:(res:any)=>{
      this.stats = res;
    },
    error:err=>console.log(err)
  });
}

}
