import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-popular-schedule',
  templateUrl: './popular-schedule.component.html',
  styleUrls: ['./popular-schedule.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PopularScheduleComponent implements OnInit {
  @Input() popularScheduleData: any;
  @Input() popularFoodData: any;

  constructor() { }

  ngOnInit(): void { }
}
