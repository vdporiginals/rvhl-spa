import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popular-schedule',
  templateUrl: './popular-schedule.component.html',
  styleUrls: ['./popular-schedule.component.scss']
})
export class PopularScheduleComponent implements OnInit {
  @Input() popularScheduleData: any;
  constructor() { }

  ngOnInit(): void { }
}
