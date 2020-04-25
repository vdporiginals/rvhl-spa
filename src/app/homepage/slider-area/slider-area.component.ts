import {
  Component,
  OnInit,
  Input,
  Inject,
  PLATFORM_ID,
  Output,
  EventEmitter
} from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser } from '@angular/common';

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
  @Output() clickScroll = new EventEmitter();

  clickScrollEvent() {
    this.clickScroll.emit();
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
  }

}
