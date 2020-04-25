import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-all-tour',
  templateUrl: './all-tour.component.html',
  styleUrls: ['./all-tour.component.scss']
})
export class AllTourComponent implements OnInit {
  tourData;
  constructor() { }

  ngOnInit(): void {
  }

}
