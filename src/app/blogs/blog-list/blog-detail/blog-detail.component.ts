import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  public blogId: string;
  blogDetail: any = {};
  private subcription: Subscription;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.children[0].params.id;

    this.subcription = this.http
      .get<any>(
        `${environment.apiUrl}/blogs/${id}?select=title,description,image,seo,address,content`
      )
      .subscribe(data => {
        this.blogDetail = data.data;
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
