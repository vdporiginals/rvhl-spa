import { Component, OnInit, ViewChild, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { faPhone, faSearch, faPlay, faUser, faDollarSign, faClock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ImageOverlayService } from 'src/app/shared/image-overlay/image-overlay.service';
import { ImageOverlayRef } from 'src/app/shared/image-overlay/image-overlay-ref';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  restaurantDetail;
  isBrowser: boolean;
  faPhone = faPhone;
  faPlay = faPlay;
  faUser = faUser;
  faSearch = faSearch;
  faDollarSign = faDollarSign;
  faClock = faClock;
  faCamera = faCamera;
  restaurantImages: Array<any> = [];
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private imageDialog: ImageOverlayService,
    @Optional() @Inject(REQUEST) private request,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.restaurantDetail) {
      this.restaurantDetail = this.route.snapshot.data.restaurantDetail.data;
      this.restaurantImages = this.route.snapshot.data.restaurantDetail.data.gallery.map(val => ({ url: val, thumbnailUrl: val }));
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
    }
  }


  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  showPreview(file) {
    const dialogRef: ImageOverlayRef = this.imageDialog.open({
      image: {
        name: this.restaurantDetail.name,
        link: '',
        url: file
      }
    });
  }
}
