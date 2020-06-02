import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faCamera, faDollarSign, faMapMarked, faPhone, faPlay } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { GALLERY_CONF, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { EntertainVideoComponent } from './entertain-video/entertain-video.component';

@Component({
  selector: 'app-entertain-detail',
  templateUrl: './entertain-detail.component.html',
  styleUrls: ['./entertain-detail.component.scss']
})
export class EntertainDetailComponent implements OnInit {
  entertainDetail;
  tbData: any = [];
  isBrowser: boolean;
  faPhone = faPhone;
  faPlay = faPlay;
  faMapMarked = faMapMarked; faDollarSign = faDollarSign;
  faCamera = faCamera;
  entertainImages: Array<any> = [];
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
    if (this.route.snapshot.data.entertainDetail) {
      this.entertainDetail = this.route.snapshot.data.entertainDetail;
      this.entertainImages = this.route.snapshot.data.entertainDetail.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.entertainDetail.data.name);
        this.seo.setDescription(this.entertainDetail.data.description, this.entertainDetail.data.image);
        this.seo.setKeywords(this.entertainDetail.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.entertainDetail.data.name);
        this.seo.setDescription(this.entertainDetail.data.description, this.entertainDetail.data.image);
        this.seo.setKeywords(this.entertainDetail.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }
  }

  ngOnInit(): void {

    this.tbData.push(this.entertainDetail.data.schedule);
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
    this.dialog.open(EntertainVideoComponent, {
      data: {
        link: id
      },
      width: 'auto',
      panelClass: 'my-dialog'
    });
  }
}
