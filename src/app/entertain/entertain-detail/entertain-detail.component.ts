import { Component, OnInit, ViewChild, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { faPhone, faPlay, faMapMarked, faDollarSign, faClock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { MatDialog } from '@angular/material/dialog';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
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

  }

  ngOnInit(): void {
    if (this.route.snapshot.data.entertainDetail) {
      this.entertainDetail = this.route.snapshot.data.entertainDetail;
      this.tbData.push(this.entertainDetail.data.schedule);
      this.entertainImages = this.route.snapshot.data.entertainDetail.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.entertainDetail.data.title);
        this.seo.setDescription(this.entertainDetail.data.description);
        this.seo.setKeywords(this.entertainDetail.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.entertainDetail.data.title);
        this.seo.setDescription(this.entertainDetail.data.description);
        this.seo.setKeywords(this.entertainDetail.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }
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
