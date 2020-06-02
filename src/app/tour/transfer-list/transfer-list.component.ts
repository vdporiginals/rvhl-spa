import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleLeft, faAngleRight, faClock, faLongArrowAltRight, faPhone } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TransferListComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPhone = faPhone;
  faClock = faClock;
  faLongArrowAltRight = faLongArrowAltRight;

  transferData: any = {};
  currentPage: number;
  isLoadingResults = true;
  count: number;
  limit = 8;
  isLastPage = false;
  isFirstPage = false;
  private subcription: Subscription;
  categoryId: any = '';
  categoryData: any;
  results: any;
  position: any;

  sortData: any;
  typeLink;
  queryField: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService,
    public router: Router,
    private sharedData: SharedDataService,
    @Optional() @Inject(REQUEST) private request,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService) {
    if (this.router.getCurrentNavigation().extras.state !== undefined) {
      this.categoryId = this.router.getCurrentNavigation().extras.state.category;
    }
    this.categoryData = this.route.snapshot.data.transferList;
    if (this.categoryData?.count !== 0) {
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Di chuyển Hạ Long, xe limousine hạ long, Xe tiện chuyến hạ long');
        this.seo.setDescription(this.categoryData?.data[0].description);
        this.seo.setKeywords(this.categoryData?.data[0].keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Di chuyển Hạ Long, xe limousine hạ long, Xe tiện chuyến hạ long');
        this.seo.setDescription(this.categoryData?.data[0]?.description);
        this.seo.setKeywords(this.categoryData?.data[0]?.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }

    }
  }

  ngOnInit(): void {
    this.typeLink = this.route.snapshot.parent.url[0].path;
    this.position = this.route.snapshot.data.position;
    if (this.categoryId !== undefined) {
      this.getTransfer(1, undefined, this.categoryId);
    } else {
      this.getTransfer(1);
    }

    this.sharedData.transferCategoryId.subscribe((id) => {
      if (id !== '') {
        this.getTransfer(1, undefined, id);
        this.sharedData.setTransferCategory('');
      }
    });
    this.sharedData.transferFormData.subscribe((val) => {
      if (Object.keys(val).length !== 0) {
        this.sortData = val;
        this.getTransfer(1, undefined, undefined, val);
        this.sharedData.setFormData({});
      }
    });


  }

  ngOnDestroy(): void {
    if (this.subcription) { this.subcription.unsubscribe(); }
  }

  getTransfer(page, position?, category?, sort?) {
    let paramsApi;
    if (category) {
      paramsApi = {
        select: 'name,description,locationStart,image,seo,phone,price,schedule',
        page,
        sort: '-isPopular,-updatedAt',
        category,
        status: true,
        limit: '8',
      }
    } else if (sort) {
      console.log(sort)
      for (let propName in sort) {
        if (sort[propName] === '' || sort[propName] === undefined) {
          delete sort[propName];
        }
      }
      paramsApi = sort;
      paramsApi.page = page;
      paramsApi.select = 'name,description,locationStart,image,phone,seo,price,schedule';
    } else {
      paramsApi = {
        select: 'name,description,locationStart,phone,image,seo,price,schedule',
        page,
        sort: '-isPopular,-updatedAt',
        status: true,
        limit: '8',
      }
    }

    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/transfers`, {
        params: paramsApi
      })
      .subscribe((data) => {
        this.transferData = data;
        this.count = data.count;
        if (Object.keys(data.pagination).length !== 0) {
          if (data.pagination.next === undefined) {
            this.isLastPage = true;
            this.currentPage = data.pagination.prev.page + 1;
          } else {
            this.isLastPage = false;
            this.currentPage = data.pagination.next.page - 1;
          }
          if (
            data.pagination.prev === undefined ||
            Object.keys(data.pagination).length === 0
          ) {
            this.isFirstPage = true;
          } else {
            this.isFirstPage = false;
          }
        } else {
          this.isFirstPage = true;
          this.isLastPage = true;
        }
      });
  }


}
