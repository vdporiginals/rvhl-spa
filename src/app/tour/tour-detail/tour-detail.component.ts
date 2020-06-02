import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, Inject, OnInit, Optional, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faCamera, faClock, faDollarSign, faPhone, faPlay, faUser } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { GALLERY_CONF, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { TourVideoComponent } from './tour-video/tour-video.component';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss'],
})
export class TourDetailComponent implements OnInit, AfterContentInit {
  tourDetail;
  tbData: any = [];
  isBrowser: boolean;
  faPhone = faPhone;
  faPlay = faPlay;
  faUser = faUser; faDollarSign = faDollarSign; faClock = faClock;
  faCamera = faCamera;
  tourImages: Array<any> = [];
  displayedColumns: string[] = ['timeStart', 'location', 'service', 'timeEnd'];
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private seo: SeoService,
    private dialog: MatDialog,
    @Optional() @Inject(REQUEST) private request,
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.route.snapshot.data.tourpost) {
      this.tourDetail = this.route.snapshot.data.tourpost;
      this.tbData.push(this.tourDetail.data.schedule);
      this.tourImages = this.route.snapshot.data.tourpost.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.tourDetail.data.title);
        this.seo.setDescription(this.tourDetail.data.description, this.tourDetail.data.image);
        this.seo.setKeywords(this.tourDetail.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.tourDetail.data.title);
        this.seo.setDescription(this.tourDetail.data.description, this.tourDetail.data.image);
        this.seo.setKeywords(this.tourDetail.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }
  }

  ngOnInit(): void {

  }

  ngAfterContentInit() {

  }
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  openVideo(id) {
    this.dialog.open(TourVideoComponent, {
      data: {
        link: id
      },
      width: 'auto',
      panelClass: 'my-dialog'
    });
  }
}