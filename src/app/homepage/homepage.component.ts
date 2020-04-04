import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  sliderData: any = {};
  popularScheduleData: any = {};
  popularPlaceData: any = {};
  popularRestaurant: any = {};
  recentBlogs: any = {};
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
        console.log(res)
        this.sliderData = res[0];
        this.popularScheduleData = res[1];
        this.popularPlaceData = res[2];
        this.popularRestaurant = res[3];
        this.recentBlogs = res[4];
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
