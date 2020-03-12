import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {
  allBlogs: any = {};
  isLoadingResults = true;
  pager = {};
  pageOfItems = [];
  private subcription: Subscription;

  constructor(public router: Router, private api: ApiService) {
    this.getData();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  getData() {
    this.subcription = this.api.getBlogs().subscribe(
      res => {
        this.allBlogs = res[0];
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
