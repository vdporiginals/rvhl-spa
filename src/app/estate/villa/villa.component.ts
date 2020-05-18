import { Component, OnInit, ViewChild, Optional, Inject, PLATFORM_ID, Input, Output, EventEmitter } from '@angular/core';
import { faRestroom, faUser, faEye, faImage, faLongArrowAltRight, faHotel, faPhone, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { NgxImageGalleryComponent, GALLERY_CONF } from 'ngx-image-gallery';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { MatDialog } from '@angular/material/dialog';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-villa',
  templateUrl: './villa.component.html',
  styleUrls: ['./villa.component.scss']
})
export class VillaComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  currentPage: number;
  isLoadingResults = true;
  count: number;
  limit = 6;
  isLastPage = false;
  isFirstPage = false;
  categoryId;
  private subcription: Subscription;

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
    if (this.route.snapshot.data.estateList) {
      this.hotelDetail = this.route.snapshot.data.estateList;
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
        status: 'true',
        limit: '6',
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
        const result = res.data.map((val) => {
          const images = val.images.map(res => {
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
            roomNum: val.roomNum,
            seo: val.seo,
            address: val.address,
            views: val.views,
            images,
          };
        });
        return { count: res.count, numRecord: res.numRecord, pagination: res.pagination, data: result };
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
