import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { faAngleLeft, faAngleRight, faMapMarker, faPhone, faEye, faImage, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
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
  private subcription: Subscription;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faMapMarker = faMapMarker;
  faPhone = faPhone;
  faEye = faEye;
  faImage = faImage;
  faLongArrowAltRight = faLongArrowAltRight;
  hotelImages: Array<any> = [];
  restaurantDetail: any = [];
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
    private seo: SeoService,
    private dialog: MatDialog,
    private sharedData: SharedDataService,
    @Optional() @Inject(REQUEST) private request,
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object) {

    this.routePosition = this.route.snapshot.parent.data.position;
    // console.log(this.routePosition)
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.restaurantList) {
      this.restaurantDetail = this.route.snapshot.data.restaurantList;
      this.count = this.restaurantDetail.count;
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Nhà hàng quảng ninh - Nhà hàng hạ long - Ăn gì Hạ long');
        this.seo.setDescription(this.restaurantDetail.data[0].description);
        this.seo.setKeywords(this.restaurantDetail.data[0].keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Nhà hàng quảng ninh - Nhà hàng hạ long - Ăn gì Hạ long');
        this.seo.setDescription(this.restaurantDetail.data[0].description);
        this.seo.setKeywords(this.restaurantDetail.data[0].keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }

      if (Object.keys(this.restaurantDetail.pagination).length !== 0) {
        if (this.restaurantDetail.pagination.next === undefined) {
          this.isLastPage = true;
          this.currentPage = this.restaurantDetail.pagination.prev.page + 1;
        } else {
          this.isLastPage = false;
          this.currentPage = this.restaurantDetail.pagination.next.page - 1;
        }
        if (
          this.restaurantDetail.pagination.prev === undefined ||
          Object.keys(this.restaurantDetail.pagination).length === 0
        ) {
          this.isFirstPage = true;
        } else {
          this.isFirstPage = false;
        }
      } else {
        this.isFirstPage = true;
        this.isLastPage = true;
      }
    }
    this.sharedData.estateCategoryId.subscribe((id) => {
      if (id !== '') {
        this.categoryId = id;
        this.getRestaurant(1, id);
        this.sharedData.setEstateCategory('');
      }
    });
    this.sharedData.estateFormData.subscribe((val) => {
      if (Object.keys(val).length !== 0) {
        this.sortData = val;
        console.log(val);
        this.getRestaurant(1, undefined, val);
        this.sharedData.setEstateFormData({});
      }
    });

    this.getRestaurant(1);
  }

  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  getRestaurant(page, category?, sort?) {
    let paramsApi;
    if (category) {
      paramsApi = {
        select: 'name,phone,description,price,seo,address,views,gallery',
        page,
        category,
        status: 'true',
        limit: '8',
      }
    } else if (sort) {
      for (const propName in sort) {
        if (sort[propName] === '' || sort[propName] === undefined) {
          delete sort[propName];
        }
      }
      paramsApi = sort;
      paramsApi.page = page;
      paramsApi.select = 'name,phone,description,price,seo,views,address,gallery';
    } else {
      paramsApi = {
        select: 'name,phone,description,price,seo,address,views,gallery',
        page,
        status: 'true',
        limit: '8',
      }
    }
    this.http.get(`${environment.apiUrl}/restaurants`,
      {
        params: paramsApi
      })
      .pipe(map((res: any) => {
        const result = res.data.map((val) => {
          const gallery = val.gallery.map(res => {
            return {
              url: res,
              thumbnailUrl: res
            }
          });
          return {
            _id: val._id,
            name: val.name,
            description: val.description,
            phone: val.phone,
            price: val.price,
            seo: val.seo,
            address: val.address,
            views: val.views,
            gallery,
          };
        });
        return { count: res.count, numRecord: res.numRecord, pagination: res.pagination, data: result };
      })).subscribe(res => {
        this.restaurantDetail = res;
        this.count = this.restaurantDetail.count;
        if (Object.keys(this.restaurantDetail.pagination).length !== 0) {
          if (this.restaurantDetail.pagination.next === undefined) {
            this.isLastPage = true;
            this.currentPage = this.restaurantDetail.pagination.prev.page + 1;
          } else {
            this.isLastPage = false;
            this.currentPage = this.restaurantDetail.pagination.next.page - 1;
          }
          if (
            this.restaurantDetail.pagination.prev === undefined ||
            Object.keys(this.restaurantDetail.pagination).length === 0
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
