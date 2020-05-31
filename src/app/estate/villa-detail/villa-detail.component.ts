import { Component, OnInit, Optional, Inject, PLATFORM_ID, LOCALE_ID, ViewChild } from '@angular/core';
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
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoginComponent } from 'src/app/layout/user/login/login.component';

@Component({
  selector: 'app-villa-detail',
  templateUrl: './villa-detail.component.html',
  styleUrls: ['./villa-detail.component.scss'],
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
export class VillaDetailComponent implements OnInit {
  villaDetail;
  tbData: any = [];
  isBrowser: boolean;
  faPhone = faPhone;
  faPlay = faPlay;
  faUser = faUser; faDollarSign = faDollarSign; faClock = faClock;
  faCamera = faCamera;
  villaImages: Array<any> = [];
  checkAvaiForm: FormGroup;
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

  constructor(
    private route: ActivatedRoute,
    private noti: NotificationService,
    private api: ApiService,
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
      roomCategory: [''],
      phone: ['', Validators.required],
      onEstate: 'Villa',
      roomId: [''],
      night: [''],
      peopleNum: ['']
    });

    if (this.route.snapshot.data.estateDetail) {
      this.villaDetail = this.route.snapshot.data.estateDetail.data;
      this.villaImages = this.route.snapshot.data.estateDetail.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.villaDetail.name);
        this.seo.setDescription(this.villaDetail.description, this.villaDetail.image);
        this.seo.setKeywords(this.villaDetail.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.villaDetail.name);
        this.seo.setDescription(this.villaDetail.description, this.villaDetail.image);
        this.seo.setKeywords(this.villaDetail.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }

    }

  }

  ngOnInit(): void {

    this.checkAvaiForm.patchValue({
      roomCategory: this.villaDetail.category,
      roomId: this.villaDetail._id
    });
  }

  sendCustomerRequest() {
    const token = JSON.parse(this.localStorage.getItem('access_token'));
    if (token === null || token === undefined) {
      this.noti.showWarning('Bạn cần đăng nhập!', 'Yêu cầu thất bại');
      this.dialog.open(LoginComponent);
    } else if (this.checkAvaiForm.invalid) {
      this.noti.showWarning('Bạn cần nhập đầy đủ sđt, checkIn, checkOut!', 'Yêu cầu thất bại');
    } else {
      this.api.postCheckRoom(this.checkAvaiForm.value, token.token).subscribe((res: any) => {
        console.log(res);
      }, err => {
        this.noti.showError(err, 'Yêu cầu thất bại')
      });
    }
  }


  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

}
