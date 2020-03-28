import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faComment, faUser } from '@fortawesome/free-solid-svg-icons';

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
  public blogId: string;
  blogDetail: any = {};
  private subcription: Subscription;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.subcription = this.http
      .get<any>(`${environment.apiUrl}/blogs/${id}`, {
        params: {
          select: 'title,description,image,seo,address,content'
        }
      })
      .subscribe(data => {
        this.blogDetail = data;
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
