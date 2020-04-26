import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrls: ['./blog-comment.component.scss']
})
export class BlogCommentComponent implements OnInit {

  @Input() commentData;
  constructor() { }

  ngOnInit(): void {
  }

}
