import { Component, OnInit } from '@angular/core';
import { SanitizeHtmlPipe } from '../shared/pipe/sanitize-html.pipe';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
