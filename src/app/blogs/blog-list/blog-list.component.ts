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
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

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
  categoryId: any = '';
  categoryData: any;
  constructor(
    private route: ActivatedRoute,
    private sharedData: SharedDataService,
    private http: HttpClient,
    public router: Router,
    private api: ApiService) {
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
    this.categoryData = this.route.snapshot.data.blogCategory;
    this.categoryData.data.forEach((val) => {
      if (this.route.snapshot.data.category === val.name) {
        this.categoryId = `/category/${val._id}`;
        this.route.snapshot.data.categoryId = this.categoryId;
      }
    })

    if (this.categoryId === undefined || this.categoryId === null) {
      this.getData(1, '');
    } else {
      this.getData(1, this.categoryId);
    }


    this.sharedData.categoryIdd.subscribe((id) => {
      if (id !== '') {
        this.categoryId = `/category/${id}`;
        this.getData(1, this.categoryId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subcription) { this.subcription.unsubscribe(); }

  }

  getData(page, categoryId) {
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/blogs${categoryId}`, {
        params: {
          select: 'title,description,images,seo,address,createdAt',
          page,
          limit: '4'
        }
      })
      .subscribe(data => {
        this.allBlogs = data.data;
        console.log();
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
