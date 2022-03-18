import { Component, Input, OnInit } from '@angular/core';
import { Summary } from 'src/app/shared/models/summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  @Input() summaries?: Summary[];
  constructor() {}

  ngOnInit(): void {}
}
