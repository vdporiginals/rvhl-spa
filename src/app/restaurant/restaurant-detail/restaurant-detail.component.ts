import { Component, OnInit, ViewChild, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { faPhone, faPlay, faUser, faDollarSign, faClock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { LoginComponent } from 'src/app/layout/user/login/login.component';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  restaurantDetail;
  tbData: any = [];
  isBrowser: boolean;
  faPhone = faPhone;
  faPlay = faPlay;
  faUser = faUser; faDollarSign = faDollarSign; faClock = faClock;
  faCamera = faCamera;
  hotelImages: Array<any> = [];
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
    private noti: NotificationService,
    private api: ApiService,
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
      onEstate: 'Hotel',
      roomId: [''],
      night: [''],
      peopleNum: ['']
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.estateDetail) {
      this.restaurantDetail = this.route.snapshot.data.estateDetail.data;
      this.hotelImages = this.route.snapshot.data.estateDetail.data.images.map(val => ({ url: val, thumbnailUrl: val }));
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.restaurantDetail.name);
        this.seo.setDescription(this.restaurantDetail.description);
        this.seo.setKeywords(this.restaurantDetail.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.restaurantDetail.name);
        this.seo.setDescription(this.restaurantDetail.description);
        this.seo.setKeywords(this.restaurantDetail.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
      this.checkAvaiForm.patchValue({
        roomCategory: this.restaurantDetail.category,
        roomId: this.restaurantDetail._id
      });
    }
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
        this.noti.showError(err, 'Yêu cầu thất bại');
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
