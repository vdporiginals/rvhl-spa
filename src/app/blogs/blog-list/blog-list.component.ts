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
} from "@angular/core";
import { Subscription } from "rxjs";
import { ApiService } from "src/app/shared/services/api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SharedDataService } from "src/app/shared/services/shared-data.service";
import { isPlatformServer } from "@angular/common";
import { SeoService } from "src/app/shared/services/seo.service";

@Component({
  selector: "app-blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"],
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
  categoryId: any = "";
  categoryData: any;
  constructor(
    private route: ActivatedRoute,
    private sharedData: SharedDataService,
    private http: HttpClient,
    public router: Router,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,
    private api: ApiService,
    private seo: SeoService
  ) {}

  ngOnChanges() {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      const req = this.injector.get("request");
      this.seo.setTitle("Reviews Du Lịch Hạ Long");
      this.seo.setDescription(
        "Review về hành trình, địa điểm, quán ăn hay nhà hàng đến từ người bản địa"
      );
      this.seo.setKeywords(
        "Review hành trình, địa điểm hạ long, quán ăn ngon hạ long, nhà hàng hạ long, tour vịnh hạ long, di chuyển"
      );
      this.seo.setOgSite(req.get("host"));
      this.seo.setOgUrl(req.get("host"));
    } else {
      this.seo.setTitle("Reviews Du Lịch Hạ Long");
      this.seo.setDescription(
        "Review về hành trình, địa điểm, quán ăn hay nhà hàng đến từ người bản địa"
      );
      this.seo.setKeywords(
        "Review hành trình, địa điểm hạ long, quán ăn ngon hạ long, nhà hàng hạ long, tour vịnh hạ long, di chuyển"
      );
      this.seo.setOgSite(window.location.origin);
      this.seo.setOgUrl(window.location.origin);
    }

    this.categoryData = this.route.snapshot.data.blogCategory;
    this.categoryData.data.forEach((val) => {
      if (this.route.snapshot.data.category === val.name) {
        this.categoryId = `/category/${val._id}`;
        this.route.snapshot.data.categoryId = this.categoryId;
      }
    });

    if (this.categoryId === undefined || this.categoryId === null) {
      this.getData(1, "");
    } else {
      this.getData(1, this.categoryId);
    }

    this.sharedData.categoryIdd.subscribe((id) => {
      if (id !== "") {
        this.categoryId = `/category/${id}`;
        this.getData(1, this.categoryId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getData(page, categoryId) {
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/blogs${categoryId}`, {
        params: {
          select: "title,description,images,seo,address,createdAt",
          page,
          limit: "4",
        },
      })
      .subscribe((data) => {
        this.allBlogs = data.data;
        this.count = data.count;
        console.log(data);
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
