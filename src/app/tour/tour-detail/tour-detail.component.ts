import { Component, OnInit, Inject, PLATFORM_ID, Injector, AfterContentInit, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Lightbox } from 'ngx-lightbox';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss'],
})
export class TourDetailComponent implements OnInit, AfterContentInit {
  tourDetail;
  tbData: any = [];
  isBrowser: boolean;
  tourImages: Array<any> = [];
  displayedColumns: string[] = ['timeStart', 'location', 'service', 'timeEnd'];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private seo: SeoService,
    private _lightbox: Lightbox,
    @Optional() @Inject(REQUEST) private request,
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit(): void {
    if (this.route.snapshot.data.tourpost) {
      this.tourDetail = this.route.snapshot.data.tourpost;
      this.tbData.push(this.tourDetail.data.schedule);

      this.route.snapshot.data.tourpost.data.images.forEach((val) => {
        const album = {
          src: val,
          caption: this.route.snapshot.data.tourpost.data.title,
          thumb: val
        };
        this.tourImages.push(album);
      });
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.tourDetail.data.title);
        this.seo.setDescription(this.tourDetail.data.description);
        this.seo.setKeywords(this.tourDetail.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.tourDetail.data.title);
        this.seo.setDescription(this.tourDetail.data.description);
        this.seo.setKeywords(this.tourDetail.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }
  }

  ngAfterContentInit() {

  }

  open(index: number): void {
    // open lightbox
    console.log(this.tourImages)
    this._lightbox.open(this.tourImages, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
