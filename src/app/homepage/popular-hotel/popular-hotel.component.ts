import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popular-hotel',
  templateUrl: './popular-hotel.component.html',
  styleUrls: ['./popular-hotel.component.scss']
})
export class PopularHotelComponent implements OnInit, OnChanges {
  @Input() popularHotelData: any;
  @Input() popularVillaData: any;
  @Input() popularHomestayData: any;
  popularHotel;
  faPhone = faPhone;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.popularHotelData.previousValue) {
      this.popularHotel = changes.popularHotelData.currentValue;
    }
  }

}
