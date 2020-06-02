import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faComment, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-user-review-detail',
  templateUrl: './user-review-detail.component.html',
  styleUrls: ['./user-review-detail.component.scss']
})
export class UserReviewDetailComponent implements OnInit, OnDestroy {
  faFacebookMessenger = faFacebookMessenger;
  faFacebook = faFacebook;
  faHeart = faHeart;
  faComment = faComment;
  faUser = faUser;
  isBrowser: boolean;
  public blogId: string;
  commentData: any;
  replyData: any;
  countReply;
  blogDetail: any = {};
  fbLike;
  blogDetailImages = [];
  private subcription: Subscription;

  constructor(
    private http: HttpClient,
    private seo: SeoService,
    private route: ActivatedRoute,
    private api: ApiService,
    @Optional() @Inject(REQUEST) private request,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.route.snapshot.data.userpost) {
      this.blogDetail = this.route.snapshot.data.userpost;
      if (isPlatformServer(this.platformId)) {
        this.seo.setTitle(this.blogDetail.data.title);
        this.seo.setDescription(this.blogDetail.data.description, this.blogDetail.data.image);
        this.seo.setKeywords(this.blogDetail.data.keywords);
        this.seo.setOgSite(this.request.get('host'));
        this.seo.setOgUrl(this.request.get('host'));
      } else {
        this.seo.setTitle(this.blogDetail.data.title);
        this.seo.setDescription(this.blogDetail.data.description, this.blogDetail.data.image);
        this.seo.setKeywords(this.blogDetail.data.keywords);
        this.seo.setOgSite(window.location.origin);
        this.seo.setOgUrl(window.location.origin);
      }
    }
  }
  ngOnInit(): void {

    this.api.getFbPlugin('fbLike').pipe(map(res => res.data[0].fbLike)).subscribe(data => {
      if (isPlatformServer(this.platformId)) {
        this.fbLike = unescape(data).replace('reviewhalong.vn', this.request.get('host'));
      } else {
        this.fbLike = unescape(data).replace('reviewhalong.vn', window.location.href);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

}
