import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { AuthService } from '../service/auth.service';
import { DashboardData } from '../models/dashboard-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData!: DashboardData;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe(
      data => {
        this.dashboardData = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}












