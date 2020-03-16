import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { delay, map, tap } from 'rxjs/operators';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {
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

  constructor(public router: Router, private api: ApiService) {
    this.getData(1);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  getData(page) {
    this.subcription = this.api.getBlogs(page, this.limit).subscribe(
      res => {
        this.allBlogs = res[0].data;
        this.count = res[0].count;
        console.log(this.allBlogs);
        if (res[0].pagination.next === undefined) {
          this.isLastPage = true;
          this.currentPage = res[0].pagination.prev.page + 1;
        } else {
          this.isLastPage = false;
          this.currentPage = res[0].pagination.next.page - 1;
        }

        if (res[0].pagination.prev === undefined) {
          this.isFirstPage = true;
        } else {
          this.isFirstPage = false;
        }
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}