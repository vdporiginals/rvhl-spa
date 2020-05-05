import { Component, OnInit, OnDestroy, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Subscription } from 'rxjs';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { SeoService } from '../shared/services/seo.service';
import { isPlatformServer } from '@angular/common';

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

  constructor(
    private api: ApiService,
    private scrollToService: ScrollToService,
    private seo: SeoService,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.getData();
  }
  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      let req = this.injector.get('request');
      this.seo.setTitle('Trang chủ review hạ long');
      this.seo.setDescription('Review Hạ long, du lịch hạ long')
      this.seo.setKeywords('Review hạ long, du lich hạ long, review du lich, hạ long, ha long, quảng ninh');
      this.seo.setOgSite(req.get('host'));
      this.seo.setOgUrl(req.get('host'));
    } else {
      this.seo.setTitle('Review du lịch Hạ Long');
      this.seo.setDescription('Đánh giá địa điểm, ăn, ngủ nghỉ ở Hạ Long bởi người bản địa');
      this.seo.setKeywords('Review hạ long, du lich hạ long, review du lich, hạ long, ha long, quảng ninh');
      this.seo.setOgSite(window.location.origin);
      this.seo.setOgUrl(window.location.origin);
    }
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  triggerScrollTo() {

    const config: ScrollToConfigOptions = {
      target: 'destination'
    };

    this.scrollToService.scrollTo(config);
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
