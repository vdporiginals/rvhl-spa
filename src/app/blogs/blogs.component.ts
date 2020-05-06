import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  categoryId: any;
  constructor() { }

  ngOnInit(): void {
  }
}
