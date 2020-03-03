import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener
} from '@angular/core';
import {
  MatCarouselSlide,
  MatCarouselSlideComponent
} from '@ngmodule/material-carousel';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { Subcription } from 'rxjs';
// import { HttpService, ApiConfig } from "../../shared/http.service";

@Component({
  selector: 'app-slider-area',
  templateUrl: './slider-area.component.html',
  styleUrls: ['./slider-area.component.scss']
})
export class SliderAreaComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  isFavorite = true;

  @Input() sliderData: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.sliderData);
  }
}
