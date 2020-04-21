import {
  Component, OnInit, OnDestroy, ViewChild, ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})

export class BlogDetailComponent implements OnInit, OnDestroy {
  faFacebookMessenger = faFacebookMessenger;
  faFacebook = faFacebook;
  faHeart = faHeart;
  faComment = faComment;
  faUser = faUser;
  isBrowser: boolean;
  public blogId: string;
  blogDetail: any = {};
  blogDetailImages = [];
  private subcription: Subscription;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  getData() {
    const id = this.route.snapshot.params.id;
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/blogs/${id}`, {
        params: {
          select: 'title,description,image,seo,address,content'
        }
      })
      .subscribe(data => {
        this.blogDetail = data;
        this.blogDetailImages = data.data.images;
      },
        err => {
          console.log(err);

        });
  }
}
