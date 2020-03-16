import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recent-blogs',
  templateUrl: './recent-blogs.component.html',
  styleUrls: ['./recent-blogs.component.scss']
})
export class RecentBlogsComponent implements OnInit {
  @Input() recentBlogs: any;

  constructor() {}

  ngOnInit(): void {}
}