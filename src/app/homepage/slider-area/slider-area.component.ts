import { Component, OnInit, OnDestroy, Input } from '@angular/core';

// import { Subcription } from 'rxjs';
// import { HttpService, ApiConfig } from "../../shared/http.service";

@Component({
  selector: 'app-slider-area',
  templateUrl: './slider-area.component.html',
  styleUrls: ['./slider-area.component.scss']
})
export class SliderAreaComponent implements OnInit {
  @Input() sliderData: any;
  // private errorSub: Subcription;

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
