import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faClock } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-popular-place',
  templateUrl: './popular-place.component.html',
  styleUrls: ['./popular-place.component.scss']
})
export class PopularPlaceComponent implements OnInit, OnChanges {
  @Input() popularCruiseData: any;
  @Input() popularHotelData: any;
  popularCruise;
  popularHotel;
  faClock = faClock;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.popularCruiseData.previousValue) {
      this.popularCruise = changes.popularCruiseData.currentValue;
    }

    if (changes.popularHotelData.previousValue) {
      this.popularHotel = changes.popularCruiseData.currentValue;
    }
  }
}
