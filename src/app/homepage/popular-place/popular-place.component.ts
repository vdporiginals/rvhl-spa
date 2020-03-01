import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popular-place',
  templateUrl: './popular-place.component.html',
  styleUrls: ['./popular-place.component.scss']
})
export class PopularPlaceComponent implements OnInit {
  @Input() popularPlaceData: any;
  constructor() {}

  ngOnInit(): void {}
}
