import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';
import { TourItem } from 'src/app/shared/tour-item';
import { ThemePalette } from '@angular/material/core';
import { ShortNumberPipe } from '../shared/pipe/short-num.pipe';
import { isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  navItems: any[] = TourItem;
  background: ThemePalette = undefined;
  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService) { }

  ngOnInit(): void {
    this.background = 'primary';
    if (isPlatformServer(this.platformId)) {
      let req = this.injector.get('request');
      this.seo.setTitle('Tour du lịch Hạ Long');
      this.seo.setDescription('Đánh giá tour vịnh, khách sạn, xe cộ ở Hạ Long bởi người bản địa');
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
}
