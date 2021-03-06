import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faCamera, faClock, faCouch, faDollarSign, faPhone, faPlay, faRoute } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { GALLERY_CONF, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { TourVideoComponent } from '../tour-detail/tour-video/tour-video.component';

@Component({
  selector: 'app-transfer-detail',
  templateUrl: './transfer-detail.component.html',
  styleUrls: ['./transfer-detail.component.scss']
})
export class TransferDetailComponent implements OnInit {
  transferDetail;
  tbData: any = [];
  isBrowser: boolean;
  faPhone = faPhone;
  faPlay = faPlay;
  faRoute = faRoute;
  faCouch = faCouch; faDollarSign = faDollarSign; faClock = faClock;
  faCamera = faCamera;
  transferImages: Array<any> = [];
  displayedColumns: string[] = ['locationStart', 'locationEnd', 'price'];
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
    if (this.route.snapshot.data.transferDetail) {
      this.transferDetail = this.route.snapshot.data.transferDetail;
      this.tbData.push(this.transferDetail.data.schedule);
      this.transferImages = this.route.snapshot.data.transferDetail.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.transferDetail.data.name);
        this.seo.setDescription(this.transferDetail.data.description, this.transferDetail.data.image);
        this.seo.setKeywords(this.transferDetail.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.transferDetail.data.name);
        this.seo.setDescription(this.transferDetail.data.description, this.transferDetail.data.image);
        this.seo.setKeywords(this.transferDetail.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }
  }

  ngOnInit(): void {

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
