import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-blog-banner',
  templateUrl: './blog-banner.component.html',
  styleUrls: ['./blog-banner.component.scss']
})
export class BlogBannerComponent implements OnInit, OnDestroy {
  private subcription: Subscription;
  banner: any = {};
  isLoadingResults = true;
  paramsBanner: string;
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.getBanner();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subcription.unsubscribe();
  }

  getBanner() {
    this.route.queryParams.subscribe(params => {
      this.paramsBanner = params.category;
    });

    this.subcription = this.api.getBannerPage(this.paramsBanner).subscribe(
      res => {
        this.banner = res.data;
        console.log(this.banner);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
