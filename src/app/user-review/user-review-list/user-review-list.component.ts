import { Component, OnInit, Input, Output, EventEmitter, Optional, Inject, Injector, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faUser, faComment, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { ImageOverlayService } from 'src/app/shared/image-overlay/image-overlay.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SeoService } from 'src/app/shared/services/seo.service';
import { ImageOverlayRef } from 'src/app/shared/image-overlay/image-overlay-ref';
import { isPlatformServer } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrls: ['./user-review-list.component.scss']
})
export class UserReviewListComponent implements OnInit, OnDestroy {
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
  limit = 6;
  isLastPage = false;
  isFirstPage = false;
  private subcription: Subscription;
  position: any = '';
  categoryData: any;
  categoryId = '';
  constructor(
    private route: ActivatedRoute,
    private sharedData: SharedDataService,
    private http: HttpClient,
    public router: Router,
    private api: ApiService, private imageDialog: ImageOverlayService,
    @Optional() @Inject(REQUEST) private request,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.api.getAdvertisePage('ReviewPage').subscribe(res => {
      if (res.data.length !== 0) {
        const dialogRef: ImageOverlayRef = this.imageDialog.open({
          image: {
            name: res.data[0].name,
            url: res.data[0].image,
            link: res.data[0].link
          },
        });
      }
    });


    this.getData(1);

    this.sharedData.reviewCategoryId.subscribe((id) => {
      if (id !== '') {
        this.categoryId = id;
        this.getData(1, this.categoryId);
      }
    });

    if (this.route.snapshot.data.userCategory.count === 0) {
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Reviews Du Lịch Hạ Long');
        this.seo.setDescription(
          'Review về hành trình, địa điểm, quán ăn hay nhà hàng đến từ người bản địa'
        );
        this.seo.setKeywords(
          'Review hành trình, địa điểm hạ long, quán ăn ngon hạ long, nhà hàng hạ long, tour vịnh hạ long, di chuyển'
        );
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Reviews Du Lịch Hạ Long');
        this.seo.setDescription(
          'Review về hành trình, địa điểm, quán ăn hay nhà hàng đến từ người bản địa'
        );
        this.seo.setKeywords(
          'Review hành trình, địa điểm hạ long, quán ăn ngon hạ long, nhà hàng hạ long, tour vịnh hạ long, di chuyển'
        );
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }


    } else {
      this.categoryData = this.route.snapshot.data.userCategory;
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle('Reviews Du Lịch Hạ Long');
        this.seo.setDescription(this.categoryData.data[0].description);
        this.seo.setKeywords(this.categoryData.data[0].keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle('Reviews Du Lịch Hạ Long');
        this.seo.setDescription(this.categoryData.data[0].description);
        this.seo.setKeywords(this.categoryData.data[0].keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }

    }

  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getData(page, category?) {
    let paramsApi;
    if (category !== undefined && category !== '') {
      paramsApi = {
        select: 'title,description,image,seo,address,createdAt',
        page,
        status: true,
        category,
        limit: '6',
      };
    } else {
      paramsApi = {
        select: 'title,description,image,seo,address,createdAt',
        page,
        status: true,
        limit: '6',
      };
    }
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/user-reviews`, {
        params: paramsApi
      })
      .subscribe((data) => {
        this.allBlogs = data.data;
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
