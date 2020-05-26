import { Component, OnInit, Input, Output, EventEmitter, Optional, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { faAngleLeft, faAngleRight, faPhone, faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SeoService } from 'src/app/shared/services/seo.service';
import { isPlatformServer } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entertain-list',
  templateUrl: './entertain-list.component.html',
  styleUrls: ['./entertain-list.component.scss']
})
export class EntertainListComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPhone = faPhone;
  faMapMarked = faMapMarked;

  entertainData: any = {};
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
    if (this.router.getCurrentNavigation().extras.state) {

      this.categoryId = this.router.getCurrentNavigation().extras.state.category;
    }
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data.entertainCategory);
    if (this.route.snapshot.data.entertainCategory) {

      this.categoryData = this.route.snapshot.data.entertainCategory;

      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Giải trí Hạ Long, vui chơi hạ long');
        this.seo.setDescription(this.categoryData.data[0].description);
        this.seo.setKeywords(this.categoryData.data[0].keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Giải trí Hạ Long, vui chơi hạ long');
        this.seo.setDescription(this.categoryData.data[0].description);
        this.seo.setKeywords(this.categoryData.data[0].keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
      this.getEntertain(1);

      if (this.categoryId !== undefined) {
        this.getEntertain(1, this.categoryId);
      }

      this.sharedData.entertainCategoryId.subscribe((id) => {
        if (id !== '') {
          this.getEntertain(1, id);
          this.sharedData.setEntertainCategory('');
        }
      });

      this.sharedData.searchFormData.subscribe((val) => {
        if (Object.keys(val).length !== 0) {
          this.sortData = val;
          this.getEntertain(1, undefined, val);
          this.sharedData.setFormData({});
        }
      });
    }

  }

  ngOnDestroy(): void {
    if (this.subcription) { this.subcription.unsubscribe(); }
  }

  getEntertain(page, category?, sort?) {
    let paramsApi;
    if (category) {
      paramsApi = {
        select: 'name,description,images,seo,phone,price,address',
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
      paramsApi.select = 'name,description,images,phone,seo,price,address';
    } else {
      paramsApi = {
        select: 'name,description,phone,images,seo,price,address',
        page,
        status: 'true',
        limit: '8',
      };
    }

    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/entertains`, {
        params: paramsApi
      })
      .subscribe((data) => {
        this.entertainData = data;
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
