import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, Optional, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faCamera, faClock, faDollarSign, faPhone, faPlay, faUser } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { GALLERY_CONF, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { LoginComponent } from 'src/app/layout/user/login/login.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SeoService } from 'src/app/shared/services/seo.service';

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
    private route: ActivatedRoute,
    private seo: SeoService,
    private api: ApiService,
    private dialog: MatDialog,
    private noti: NotificationService,
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
      onEstate: 'Homestay',
      roomId: [''],
      night: [''],
      peopleNum: ['']
    });

    if (this.route.snapshot.data.estateDetail) {
      this.homestayDetail = this.route.snapshot.data.estateDetail.data;
      this.homestayImages = this.route.snapshot.data.estateDetail.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.homestayDetail.name);
        this.seo.setDescription(this.homestayDetail.description, this.homestayDetail.image);
        this.seo.setKeywords(this.homestayDetail.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.homestayDetail.name);
        this.seo.setDescription(this.homestayDetail.description, this.homestayDetail.image);
        this.seo.setKeywords(this.homestayDetail.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }

    }
  }

  ngOnInit(): void {

    this.checkAvaiForm.patchValue({
      roomCategory: this.homestayDetail.category,
      roomId: this.homestayDetail._id
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
