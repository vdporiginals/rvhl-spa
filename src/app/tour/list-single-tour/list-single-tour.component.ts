import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { Subscription } from 'rxjs';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
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
  queryField: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService,
    public router: Router,
    private seo: SeoService) {
  }

  ngOnInit(): void {
    this.categoryData = this.route.snapshot.data.tourCategory;
    this.categoryData.data.forEach((val) => {
      if (this.route.snapshot.data.category === val.name) {
        this.categoryId = `/category/${val._id}`;
        this.route.snapshot.data.categoryId = this.categoryId;
      }
    });
    if (this.categoryId === undefined || this.categoryId === null) {
      this.getTour(1, '');
    } else {
      this.getTour(1, this.categoryId);
    }

    this.queryField.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        map(val => val.length >= 3 ? val : null),
        switchMap((query) => {
          if (query === null) {
            return;
          } else {
            return this.api.searchByName(query, 'tours');
          }
        })
      ).subscribe((result: any) => {
        this.results = result.data;
      });

    this.seo.setTitle(`Các loại Tour du lịch Hạ Long`);
    this.seo.setDescription('Đánh giá tour vịnh, khách sạn, xe cộ ở Hạ Long bởi người bản địa');
  }

  ngOnDestroy(): void {
    if (this.subcription) { this.subcription.unsubscribe(); }
  }

  getTour(page, categoryId) {
    this.subcription = this.http.get<any>(`${environment.apiUrl}/tours${categoryId}`, {
      params: {
        select: 'title,phone,description,images,seo,schedule,time,price,address,customerNum',
        page,
        limit: '4',
      }
    }).subscribe((data: any) => {
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
        if (data.pagination.prev === undefined || Object.keys(data.pagination).length === 0) {
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
