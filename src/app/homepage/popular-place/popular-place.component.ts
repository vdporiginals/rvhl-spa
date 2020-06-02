import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
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
  faPhone = faPhone;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.popularCruiseData.previousValue) {
      this.popularCruise = changes.popularCruiseData.currentValue;
    }
  }
}
