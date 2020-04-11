import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common';
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
  isBrowser: boolean;

  @Input() sliderData: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
  }

}
