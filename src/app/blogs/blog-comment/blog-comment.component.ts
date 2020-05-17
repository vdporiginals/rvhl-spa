import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.scss']
})
export class BlogCommentComponent implements OnInit {
  @Input() commentData;
  @Input() blogId;
  isReply = false;
  commentForm: FormGroup;
  replyForm: FormGroup;
  isLoggin = false;
  itemId;
  itemIndex;
  constructor(
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
