import { Component, OnInit, Inject, PLATFORM_ID, Injector, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit, AfterContentInit {
  tourDetail;
  tbData: any = [];
  isBrowser: boolean;
  tourImages: any = [];
  displayedColumns: string[] = ['timeStart', 'location', 'service', 'timeEnd'];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private seo: SeoService,
    private injector: Injector,
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    console.log(this.route.snapshot.data.tourpost.data.schedule)
    this.tourDetail = this.route.snapshot.data.tourpost;
    this.tbData.push(this.route.snapshot.data.tourpost.data.schedule);
    this.tourImages = this.route.snapshot.data.tourpost.data.images;
  }

  ngAfterContentInit() {
    if (isPlatformServer(this.platformId)) {
      let req = this.injector.get('request');
      this.seo.setTitle(this.tourDetail.data.title);
      this.seo.setDescription(this.tourDetail.data.description);
      this.seo.setKeywords(this.tourDetail.data.keywords);
      this.seo.setOgSite(req.get('host'));
      this.seo.setOgUrl(req.get('host'));
    } else {
      this.seo.setTitle(this.tourDetail.data.title);
      this.seo.setDescription(this.tourDetail.data.description);
      this.seo.setKeywords(this.tourDetail.data.keywords);
      this.seo.setOgSite(window.location.origin);
      this.seo.setOgUrl(window.location.origin);
    }
  }
}
