import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAngleLeft, faAngleRight, faEye, faHotel, faImage, faLongArrowAltRight, faPhone } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { GALLERY_CONF, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { map } from 'rxjs/operators';
import { ImageOverlayRef } from 'src/app/shared/image-overlay/image-overlay-ref';
import { ImageOverlayService } from 'src/app/shared/image-overlay/image-overlay.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-villa',
  templateUrl: './villa.component.html',
  styleUrls: ['./villa.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class VillaComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  currentPage: number;
  isLoadingResults = true;
  count: number;
  limit = 8;
  isLastPage = false;
  isFirstPage = false;
  categoryId;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faHotel = faHotel;
  faPhone = faPhone;
  faEye = faEye;
  faImage = faImage;
  faLongArrowAltRight = faLongArrowAltRight;
  hotelImages: Array<any> = [];
  hotelDetail: any = [];
  routePosition;
  sortData;
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private seo: SeoService, private api: ApiService, private imageDialog: ImageOverlayService,
    private sharedData: SharedDataService,
    @Optional() @Inject(REQUEST) private request,
    @Inject(PLATFORM_ID) private platformId: Object) {

    this.routePosition = this.route.snapshot.parent.data.position;
    if (this.route.snapshot.data.estateList) {
      this.hotelDetail = this.route.snapshot.data.estateList;
      this.count = this.hotelDetail?.count;

      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Villa - Villa hạ long - Villa quảng ninh');
        this.seo.setDescription(this.hotelDetail?.data[0]?.description);
        this.seo.setKeywords(this.hotelDetail?.data[0]?.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Villa - Villa hạ long - Villa quảng ninh');
        this.seo.setDescription(this.hotelDetail?.data[0]?.description);
        this.seo.setKeywords(this.hotelDetail?.data[0]?.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }


    }
  }

  ngOnInit(): void {
    this.api.getAdvertisePage('VillaPage').subscribe(res => {
      if (res.data.length !== 0) {
        const dialogRef: ImageOverlayRef = this.imageDialog.open({
          image: {
            name: res.data[0].name,
            url: res.data[0].image,
            link: res.data[0].link
          },
        });
      }
    });

    if (Object.keys(this.hotelDetail.pagination).length !== 0) {
      if (this.hotelDetail.pagination.next === undefined) {
        this.isLastPage = true;
        this.currentPage = this.hotelDetail.pagination.prev.page + 1;
      } else {
        this.isLastPage = false;
        this.currentPage = this.hotelDetail.pagination.next.page - 1;
      }
      if (
        this.hotelDetail.pagination.prev === undefined ||
        Object.keys(this.hotelDetail.pagination).length === 0
      ) {
        this.isFirstPage = true;
      } else {
        this.isFirstPage = false;
      }
    } else {
      this.isFirstPage = true;
      this.isLastPage = true;
    }
    this.sharedData.estateCategoryId.subscribe((id) => {
      if (id !== '') {
        this.categoryId = id;
        this.getHotel(1, this.routePosition, id);
        this.sharedData.setEstateCategory('');
      }
    });
    this.sharedData.estateFormData.subscribe((val) => {
      if (Object.keys(val).length !== 0) {
        this.sortData = val;
        console.log(val);
        this.getHotel(1, this.routePosition, undefined, val);
        this.sharedData.setEstateFormData({});
      }
    });
  }

  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  getHotel(page, routePosition, category?, sort?) {
    let paramsApi;
    if (category) {
      paramsApi = {
        select: 'name,phone,description,price,roomNum,seo,address,views,images',
        page,
        category,
        sort: '-isPopular,-updatedAt',
        status: 'true',
        limit: '8',
      }
    } else if (sort) {
      for (let propName in sort) {
        if (sort[propName] === '' || sort[propName] === undefined) {
          delete sort[propName];
        }
      }
      paramsApi = sort;
      paramsApi.page = page;
      paramsApi.select = 'name,phone,description,price,roomNum,seo,views,address,images';
    }
    this.http.get(`${environment.apiUrl}/estates/${routePosition}`,
      {
        params: paramsApi
      })
      .pipe(map((res: any) => {

        return { count: res.count, numRecord: res.numRecord, pagination: res.pagination, data: res.data };
      })).subscribe(res => {
        this.hotelDetail = res;
        this.count = this.hotelDetail.count;
        if (Object.keys(this.hotelDetail.pagination).length !== 0) {
          if (this.hotelDetail.pagination.next === undefined) {
            this.isLastPage = true;
            this.currentPage = this.hotelDetail.pagination.prev.page + 1;
          } else {
            this.isLastPage = false;
            this.currentPage = this.hotelDetail.pagination.next.page - 1;
          }
          if (
            this.hotelDetail.pagination.prev === undefined ||
            Object.keys(this.hotelDetail.pagination).length === 0
          ) {
            this.isFirstPage = true;
          } else {
            this.isFirstPage = false;
          }
        } else {
          this.isFirstPage = true;
          this.isLastPage = true;
        }
      })
  }


}
