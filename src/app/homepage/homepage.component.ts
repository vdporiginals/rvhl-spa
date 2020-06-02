import { isPlatformServer } from '@angular/common';
import { Component, Inject, Injector, OnDestroy, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subscription } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { SeoService } from '../shared/services/seo.service';

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
  advertiseHomepage: any = [];
  private subcription: Subscription;

  constructor(
    private api: ApiService,
    private scrollToService: ScrollToService,
    private seo: SeoService,
    private injector: Injector,
    @Optional() @Inject(REQUEST) private request,
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformServer(this.platformId)) {
      this.seo.setTitle('Review Hạ Long | Trải nghiệm Hạ Long trong tầm tay');
      this.seo.setDescription('Kết nối, chia sẻ kinh nghiệm du lịch Hạ Long, Quảng Ninh');
      this.seo.setKeywords('Review hạ long, du lich hạ long,du lịch quảng ninh,review du lich, hạ long, ha long, quảng ninh');
      this.seo.setOgSite(this.request.get('host'));
      this.seo.setOgUrl(this.request.get('host'));
    } else {
      this.seo.setTitle('Review Hạ Long | Trải nghiệm Hạ Long trong tầm tay');
      this.seo.setDescription('Kết nối, chia sẻ kinh nghiệm du lịch Hạ Long, Quảng Ninh');
      this.seo.setKeywords('Review hạ long, du lich hạ long,du lịch quảng ninh,review du lich, hạ long, ha long, quảng ninh');
      this.seo.setOgSite(window.location.origin);
      this.seo.setOgUrl(window.location.origin);
    }
    this.getData();
  }
  ngOnInit(): void {

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
        this.popularFoodData = res[1].data;
        this.popularHotelData = res[2].data;
        this.popularCruiseData = res[3].data;
        this.recentBlogs = res[4].data;
        this.videoBg = res[5].data;
        // console.log(this.popularFoodData)
        this.advertiseHomepage = res[6].data;
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
