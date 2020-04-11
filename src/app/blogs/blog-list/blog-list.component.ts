import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  faUser = faUser;
  faComment = faComment;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  allBlogs: any[] = [];
  currentPage: number;
  isLoadingResults = true;
  count: number;
  limit = 4;
  isLastPage = false;
  isFirstPage = false;
  private subcription: Subscription;
  categoryParams: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, public router: Router, private api: ApiService) {

  }

  ngOnChanges() {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.category !== undefined) {
        this.categoryParams = params.category;
        this.getDataByQuery(1);
      } else {
        this.getData(1);
      }
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  getData(page) {
    this.subcription = this.api.getBlogs(page, this.limit).subscribe(
      res => {
        this.allBlogs = res[0].data;
        this.count = res[0].count;
        if (res[0].pagination.next === undefined) {
          this.isLastPage = true;
          this.currentPage = res[0].pagination.prev.page + 1;
        } else {
          this.isLastPage = false;
          this.currentPage = res[0].pagination.next.page - 1;
        }
        if (res[0].pagination.prev === undefined) {
          this.isFirstPage = true;
        } else {
          this.isFirstPage = false;
        }
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  getDataByQuery(page) {
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/blogs`, {
        params: {
          select: 'title,description,images,seo,address,createdAt',
          page,
          limit: '4',
          category: this.categoryParams
        }
      })
      .subscribe(data => {
        this.allBlogs = data.data;
        this.count = data.count;
        if (data.pagination.next !== undefined || data.pagination.prev !== undefined) {
          if (data.pagination.next === undefined) {
            this.isLastPage = true;
            this.currentPage = data.pagination.prev.page + 1;
          } else {
            this.isLastPage = false;
            this.currentPage = data.pagination.next.page - 1;
          }
          if (data.pagination.prev === undefined) {
            this.isFirstPage = true;
          } else {
            this.isFirstPage = false;
          }
        }
      });
  }
}
