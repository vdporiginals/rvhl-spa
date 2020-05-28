import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.scss']
})
export class BlogCommentComponent implements OnInit {
  commentData;
  @Input() blogId;
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;
  private subcription: Subscription;

  isLastPage = false;
  isFirstPage = false;
  currentPage: number;
  isLoadingResults = true;
  count: number;
  limit = 4;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  isReply = false;
  commentForm: FormGroup;
  replyForm: FormGroup;
  isLoggin = false;
  itemId;
  itemIndex;
  constructor(
    private route: ActivatedRoute,
    private shareData: SharedDataService,
    private noti: NotificationService,
    private http: HttpClient,
    private localStorage: LocalStorageService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.replyForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.shareData.isLogged.subscribe((isLogged) => {
      const hasLogin = this.localStorage.getItem('access_token');
      if (hasLogin === null || hasLogin === undefined) {
        this.isLoggin = isLogged;
      } else {
        this.isLoggin = true;
      }
    });

    this.getComment(1);
  }


  getComment(page) {
    if (this.route.snapshot.data.blogpost) {
      const id = this.route.snapshot.data.blogpost.data._id;
      this.subcription = this.http
        .get<any>(`${environment.apiUrl}/comments/${id}`, {
          params: {
            select: 'content',
            limit: '4',
            page,
            status: 'true'
          }
        })
        .subscribe(data => {
          this.commentData = data;
          if (Object.keys(data.pagination).length !== 0) {
            if (data.pagination.next === undefined) {
              this.isLastPage = true;
              this.currentPage = data.pagination.prev.page + 1;
            } else {
              this.isLastPage = false;
              this.currentPage = data.pagination.next.page - 1;
            }
            if (
              data.pagination.prev === undefined ||
              Object.keys(data.pagination).length === 0
            ) {
              this.isFirstPage = true;
            } else {
              this.isFirstPage = false;
            }
          } else {
            this.isFirstPage = true;
            this.isLastPage = true;
          }
        }, err => {
          console.log(err);

        }, () => {

        });
    }

  }

  postComment() {
    const auth = JSON.parse(this.localStorage.getItem('access_token'));
    this.http.post(`${environment.apiUrl}/comments/${this.blogId}`, this.commentForm.value, {
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    }).subscribe(res => {
      this.noti.showSuccess('Comment của bạn đang chờ được duyệt', '');
    }, error => {
      this.noti.showError('Comment Thất bại', error.error);
    });
  }

  checkIsReply(id, index) {
    this.isReply = true;
    this.itemId = id;
    this.itemIndex = index;
  }

  postReply() {
    const auth = JSON.parse(this.localStorage.getItem('access_token'));
    this.http.post(`${environment.apiUrl}/comments/${this.blogId}/${this.itemId}`, this.replyForm.value, {
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    }).subscribe(res => {
      this.noti.showSuccess('Comment của bạn đang chờ được duyệt', '');
      this.isReply = false;
    }, error => {
      this.noti.showError('Comment Thất bại', error.error);
    });
  }
}
