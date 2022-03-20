import { Component, OnInit } from '@angular/core';
import { StatisticsModel } from 'src/app/shared/models/statistics.model';
import { StatisticsService } from 'src/app/shared/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statistics?: StatisticsModel ;
  date: Date = new Date();
  data: any;
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getStatistics(this.date.getFullYear(), this.date.getMonth() + 2).subscribe(
      (res) => this.statistics = res,
      err => console.log(err),
      () => this.updateData()
    )
  }

  updateData() {
    this.data = {
      labels: this.statistics?.requests.map(r => r.key),
      datasets: [
        {
          data: this.statistics?.requests.map(r => parseInt(r.value)),
          backgroundColor: this.statistics?.requests.map(() => {
              return Math.floor(Math.random()*16777215).toString(16);
          }),
          hoverBackgroundColor: 
            this.statistics?.requests.map(() => {
              return Math.floor(Math.random()*16777215).toString(16);
            }),
        }
      ]
    }
    console.log(this.data);
  }
  
}
