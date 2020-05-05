import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';
import { SanitizeHtmlPipe } from '../shared/pipe/sanitize-html.pipe';
import { ActivatedRoute } from '@angular/router';
import { isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  categoryId: any;
  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      let req = this.injector.get('request');
      this.seo.setTitle('Review du lịch Hạ Long');
      this.seo.setDescription('Đánh giá địa điểm, ăn, ngủ nghỉ ở Hạ Long bởi người bản địa');
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
