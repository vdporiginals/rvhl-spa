import { Component, OnInit, Optional, Inject, PLATFORM_ID, LOCALE_ID, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { MatDialog } from '@angular/material/dialog';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { faPhone, faPlay, faUser, faDollarSign, faClock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';

@Component({
  selector: 'app-homestay-detail',
  templateUrl: './homestay-detail.component.html',
  styleUrls: ['./homestay-detail.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class HomestayDetailComponent implements OnInit {
  homestayDetail;
  tbData: any = [];
  isBrowser: boolean;
  faPhone = faPhone;
  faPlay = faPlay;
  faUser = faUser; faDollarSign = faDollarSign; faClock = faClock;
  faCamera = faCamera;
  homestayImages: Array<any> = [];
  checkAvaiForm: FormGroup;
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
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
    public fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.checkAvaiForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      customerLog: [''],
      night: [''],
      customerNum: [''],
      customerPhone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.estateDetail) {
      this.homestayDetail = this.route.snapshot.data.estateDetail.data;
      this.homestayImages = this.route.snapshot.data.estateDetail.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.homestayDetail.name);
        this.seo.setDescription(this.homestayDetail.description);
        this.seo.setKeywords(this.homestayDetail.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.homestayDetail.name);
        this.seo.setDescription(this.homestayDetail.description);
        this.seo.setKeywords(this.homestayDetail.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }
  }

  sendCustomerRequest() {

  }


  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

}
