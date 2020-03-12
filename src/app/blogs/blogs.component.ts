import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {
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
