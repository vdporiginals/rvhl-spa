import {
  Component, OnInit, OnDestroy,
  Inject,
  PLATFORM_ID,
  Injector,
  AfterContentInit
} from '@angular/core';
import { SanitizeHtmlPipe } from '../../shared/pipe/sanitize-html.pipe';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})

export class BlogDetailComponent implements OnInit, OnDestroy, AfterContentInit {
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
    private seo: SeoService,
    private injector: Injector,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    // this.getData();
    console.log(this.route.snapshot.data.blogpost);
    this.blogDetail = this.route.snapshot.data.blogpost;
  }

  ngOnDestroy(): void {
    // this.subcription.unsubscribe();
  }

  ngAfterContentInit() {
    if (isPlatformServer(this.platformId)) {
      let req = this.injector.get('request');
      this.seo.setTitle(this.blogDetail.data.title);
      this.seo.setDescription(this.blogDetail.data.description);
      this.seo.setKeywords(this.blogDetail.data.keywords);
      this.seo.setOgSite(req.get('host'));
      this.seo.setOgUrl(req.get('host'));
    } else {
      this.seo.setTitle(this.blogDetail.data.title);
      this.seo.setDescription(this.blogDetail.data.description);
      this.seo.setKeywords(this.blogDetail.data.keywords);
      this.seo.setOgSite(window.location.origin);
      this.seo.setOgUrl(window.location.origin);
    }

  }
  getData() {
    // const id = this.route.snapshot.params.id;
    // this.subcription = this.http
    //   .get<any>(`${environment.apiUrl}/blogs/${id}`, {
    //     params: {
    //       select: 'title,description,image,seo,address,content,comments'
    //     }
    //   })
    //   .subscribe(data => {
    //     this.blogDetail = data;
    //     this.blogDetailImages = data.data.images;
    //   }, err => {
    //     console.log(err);

    //   }, () => {

    //   });
  }
}
