import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  Injector,
  Inject,
  PLATFORM_ID,
  Optional,
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
import { isPlatformServer } from '@angular/common';
import { SeoService } from 'src/app/shared/services/seo.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ImageOverlayService } from 'src/app/shared/image-overlay/image-overlay.service';
import { ImageOverlayRef } from 'src/app/shared/image-overlay/image-overlay-ref';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
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

  ngOnChanges() { }

  ngOnInit(): void {
    this.api.getAdvertisePage('SchedulePage').subscribe(res => {
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

    if (this.route.snapshot.data.blogCategory) {
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

      this.categoryData = this.route.snapshot.data.blogCategory;
      this.position = this.route.snapshot.data.position;
      if (this.position === undefined) {
        this.getData(1);
      } else if (this.position !== undefined) {
        this.getData(1, this.position);
      }

      this.sharedData.categoryIdd.subscribe((id) => {
        if (id !== '') {
          this.categoryId = id;
          this.getData(1, undefined, this.categoryId);
        }
      });
    }

  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getData(page, position?, category?) {
    let paramsApi;
    if (category !== undefined) {
      paramsApi = {
        select: 'title,description,images,seo,address,createdAt',
        page,
        category,
        limit: '4',
      };
    } else if (position !== undefined) {
      paramsApi = {
        select: 'title,description,images,seo,address,createdAt',
        page,
        position,
        limit: '4',
      };
    } else {
      paramsApi = {
        select: 'title,description,images,seo,address,createdAt',
        page,
        limit: '4',
      };
    }
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/blogs`, {
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
