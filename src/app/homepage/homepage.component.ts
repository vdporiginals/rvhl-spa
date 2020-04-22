import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  sliderData: any = [];
  popularScheduleData: any = [];
  popularFoodData: any = [];
  popularHotelData: any = [];
  popularCruiseData: any = [];
  recentBlogs: any = [];
  videoBg: any = [];
  isLoadingResults = true;
  private subcription: Subscription;

  constructor(private api: ApiService) {
    this.getData();
  }
  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  getData() {
    this.subcription = this.api.getContentHomepage().subscribe(
      res => {
        this.sliderData = res[0].data;
        this.popularScheduleData = res[1].data;
        this.popularFoodData = res[2].data;
        this.popularHotelData = res[3].data;
        this.popularCruiseData = res[4].data;
        this.recentBlogs = res[5].data;
        this.videoBg = res[6].data;
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
