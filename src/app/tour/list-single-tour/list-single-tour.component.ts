import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output, PLATFORM_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleLeft, faAngleRight, faClock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-list-single-tour',
  templateUrl: './list-single-tour.component.html',
  styleUrls: ['./list-single-tour.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ListSingleTourComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPhone = faPhone;
  faClock = faClock;

  tourData: any = {};
  currentPage: number;
  isLoadingResults = true;
  count: number;
  limit = 8;
  isLastPage = false;
  isFirstPage = false;
  private subcription: Subscription;
  categoryId: any;
  categoryData: any;
  results: any;
  position: any;
  typeLink;
  sortData: any;
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
    if (this.route.snapshot.data.tourCategory) {

      this.categoryData = this.route.snapshot.data.tourCategory;

      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Tour Hạ Long, Tour trọn gói, Tour vịnh');
        this.seo.setDescription(this.categoryData?.data[0]?.description);
        this.seo.setKeywords(this.categoryData?.data[0]?.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Tour Hạ Long, Tour trọn gói, Tour vịnh');
        this.seo.setDescription(this.categoryData?.data[0]?.description);
        this.seo.setKeywords(this.categoryData?.data[0]?.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }

  }

  ngOnInit(): void {
    this.typeLink = this.route.snapshot.parent.url[0].path;
    if (this.categoryId !== undefined) {
      this.getTour(1, undefined, this.categoryId);
    }

    this.position = this.route.snapshot.data.position;

    if ((this.position === undefined || this.position === null) && this.categoryId === undefined) {
      this.getTour(1);
    } else if ((this.position !== undefined || this.position !== null) && this.categoryId === undefined) {
      this.getTour(1, this.position);
    }

    this.sharedData.tourCategoryId.subscribe((id) => {
      if (id !== '') {
        this.getTour(1, undefined, id);
        this.sharedData.setTourCategory('');
      }
    });
    this.sharedData.searchFormData.subscribe((val) => {
      if (Object.keys(val).length !== 0) {
        this.sortData = val;
        this.getTour(1, undefined, undefined, val);
        this.sharedData.setFormData({});
      }
    });

  }

  ngOnDestroy(): void {
    if (this.subcription) { this.subcription.unsubscribe(); }
  }

  getTour(page, position?, category?, sort?) {
    let paramsApi;
    if (category) {
      paramsApi = {
        select: 'title,description,schedule,image,seo,phone,price,time',
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
      paramsApi.select = 'title,description,schedule,image,phone,seo,price,time';
      paramsApi.position = this.position;
    } else if (position !== undefined && sort === undefined) {
      paramsApi = {
        select: 'title,description,schedule,image,phone,seo,price,time',
        page,
        sort: '-isPopular,-updatedAt',
        position,
        status: 'true',
        limit: '8',
      }
    } else {
      paramsApi = {
        select: 'title,description,schedule,phone,image,seo,price,time',
        page,
        status: 'true',
        limit: '8',
      }
    }

    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/tours`, {
        params: paramsApi
      })
      .subscribe((data) => {
        this.tourData = data;
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
