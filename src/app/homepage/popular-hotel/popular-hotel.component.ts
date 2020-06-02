import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popular-hotel',
  templateUrl: './popular-hotel.component.html',
  styleUrls: ['./popular-hotel.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 }))
      ])
    ])
  ]
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
