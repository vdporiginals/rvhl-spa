import { Component, OnInit, Optional, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { faEye, faImage } from '@fortawesome/free-regular-svg-icons';
import { faHotel, faPhone, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { MatDialog } from '@angular/material/dialog';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  faHotel = faHotel;
  faPhone = faPhone;
  faEye = faEye;
  faImage = faImage;
  faLongArrowAltRight = faLongArrowAltRight;
  hotelImages: Array<any> = [];
  hotelDetail: any = [];
  routePosition;
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
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.hotelDetail = this.route.snapshot.data.estateList;
  }

  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

}
