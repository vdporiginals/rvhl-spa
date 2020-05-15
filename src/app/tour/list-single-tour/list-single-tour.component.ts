import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, Injector, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { Subscription } from 'rxjs';
import { faAngleLeft, faAngleRight, faPhone, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
@Component({
  selector: 'app-list-single-tour',
  templateUrl: './list-single-tour.component.html',
  styleUrls: ['./list-single-tour.component.scss']
})
export class ListSingleTourComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPhone = faPhone;
  faEye = faEye;

  tourData: any = {};
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
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.tourCategory) {
      if (isPlatformServer(this.platformId)) {
        console.log(this.route.snapshot.data)
        this.seo.setTitle(this.route.snapshot.data.title);
        this.seo.setDescription(this.route.snapshot.data.description);
        this.seo.setKeywords(this.route.snapshot.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.route.snapshot.data.title);
        this.seo.setDescription(this.route.snapshot.data.description);
        this.seo.setKeywords(this.route.snapshot.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }

      this.categoryData = this.route.snapshot.data.tourCategory;
      this.position = this.route.snapshot.data.position;

      if (this.position === undefined || this.position === null) {
        this.getTour(1);
      } else {
        this.getTour(1, this.position);
      }

      this.sharedData.tourCategoryId.subscribe((id) => {
        if (id !== '') {
          this.getTour(1, undefined, id);
        }
      });
      this.sharedData.searchFormData.subscribe((val) => {
        if (Object.keys(val).length !== 0) {
          this.getTour(1, undefined, undefined, val);
        }
      });
    }

  }

  ngOnDestroy(): void {
    if (this.subcription) { this.subcription.unsubscribe(); }
  }

  getTour(page, position?, category?, sort?) {
    let paramsApi;
    if (category) {
      paramsApi = {
        select: 'title,description,schedule,images,seo,phone,price,views',
        page,
        category,
        limit: '4',
      }
    } else if (sort) {
      paramsApi = sort;
      paramsApi.select = 'title,description,schedule,images,phone,seo,price,views';
    } else if (position !== undefined) {
      paramsApi = {
        select: 'title,description,schedule,images,phone,seo,price,views',
        page,
        position,
        limit: '4',
      }
    } else {
      paramsApi = {
        select: 'title,description,schedule,phone,images,seo,price,views',
        page,
        limit: '4',
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
