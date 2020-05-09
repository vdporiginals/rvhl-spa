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
  @Input() countReply;
  @Input() commentData;
  @Input() blogId;

  commentForm: FormGroup;
  isLoggin = false;
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
    this.shareData.isLogged.subscribe((isLogged) => {
      const hasLogin = this.localStorage.getItem('access_token');
      console.log(this.countReply)
      if (hasLogin === null || hasLogin === undefined) {
        this.isLoggin = isLogged;
      } else {
        this.isLoggin = true;
      }
    });
  }

  postComment() {
    this.http.post(`${environment.apiUrl}/comments/${this.blogId}`, this.commentForm.value).subscribe(res => {
      this.noti.showSuccess('Comment của bạn đang chờ được duyệt', '');
    }, error => {
      this.noti.showError('Comment Thất bại', error.error);
    });
  }
}
