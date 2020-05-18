import { Component, OnInit, Input, Output, EventEmitter, Optional, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faAngleLeft, faAngleRight, faPhone, faClock, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SeoService } from 'src/app/shared/services/seo.service';
import { isPlatformServer } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
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
  limit = 4;
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
    if (this.router.getCurrentNavigation().extras.state) {
      this.categoryId = this.router.getCurrentNavigation().extras.state.category;
    }
  }

  ngOnInit(): void {
    this.typeLink = this.route.snapshot.parent.url[0].path;
    if (this.route.snapshot.data.transferList) {

      this.categoryData = this.route.snapshot.data.transferList;
      this.position = this.route.snapshot.data.position;
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Di chuyển Hạ Long, xe limousine hạ long, Xe tiện chuyến hạ long');
        this.seo.setDescription(this.categoryData.data[0].description);
        this.seo.setKeywords(this.categoryData.data[0].keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Di chuyển Hạ Long, xe limousine hạ long, Xe tiện chuyến hạ long');
        this.seo.setDescription(this.categoryData.data[0].description);
        this.seo.setKeywords(this.categoryData.data[0].keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }

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

  }

  ngOnDestroy(): void {
    if (this.subcription) { this.subcription.unsubscribe(); }
  }

  getTransfer(page, position?, category?, sort?) {
    let paramsApi;
    if (category) {
      paramsApi = {
        select: 'name,description,locationStart,images,seo,phone,price,locationEnd,timePerTrip',
        page,
        category,
        status: true,
        limit: '4',
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
      paramsApi.select = 'name,description,locationStart,images,phone,seo,price,locationEnd,timePerTrip';
    } else {
      paramsApi = {
        select: 'name,description,locationStart,phone,images,seo,price,locationEnd,timePerTrip',
        page,
        status: true,
        limit: '4',
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
