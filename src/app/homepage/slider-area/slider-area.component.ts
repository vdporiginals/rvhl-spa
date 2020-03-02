import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 800,
    autoplayTimeout: 5000,
    navSpeed: 700,
    items: 1,
    navText: ['>', '<'],
    nav: false
  };

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   event.target.innerWidth;
  //   console.log(event.target.innerWidth);
  // }

  constructor() {}

  ngOnInit(): void {
    // this.errorSub = this.httpService.error.subscribe(error => {
    //   this.error = error;
    // });
    // this.isFetching = true;
    // this.httpService.getAllBanner().subscribe(banner => {
    //   this.isFetching = false;
    //   this.loadedData = banner;
    // });

    console.log(this.sliderData);
  }
}
