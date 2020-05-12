import {
  Component, OnInit, OnDestroy,
  Inject,
  PLATFORM_ID,
  Injector,
  Optional
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SeoService } from 'src/app/shared/services/seo.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';

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
  commentData: any;
  replyData: any;
  countReply = 0;
  blogDetail: any = {};
  blogDetailImages = [];
  private subcription: Subscription;

  constructor(
    private http: HttpClient,
    private seo: SeoService,
    private injector: Injector,
    private route: ActivatedRoute,
    @Optional() @Inject(REQUEST) private request,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    if (this.route.snapshot.data.blogpost) {

      this.blogDetail = this.route.snapshot.data.blogpost;
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.blogDetail.data.title);
        this.seo.setDescription(this.blogDetail.data.description);
        this.seo.setKeywords(this.blogDetail.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.blogDetail.data.title);
        this.seo.setDescription(this.blogDetail.data.description);
        this.seo.setKeywords(this.blogDetail.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }

    this.getComment();
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getComment() {
    console.log(this.route.snapshot.data.blogpost.data._id);
    const id = this.route.snapshot.data.blogpost.data._id;
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/admin/comments/${id}`, {
        params: {
          status: 'false'
        }
      })
      .subscribe(data => {
        this.commentData = data;
        console.log(data.data);
        data.data.forEach((val: any) => {
          this.countReply = val.answerCount++;
        });
        console.log(this.countReply);
      }, err => {
        console.log(err);

      }, () => {

      });
  }
}
