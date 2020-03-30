import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-blog-filter',
  templateUrl: './blog-filter.component.html',
  styleUrls: ['./blog-filter.component.scss']
})
export class BlogFilterComponent implements OnInit {
  faSearch = faSearch;
  constructor() { }

  ngOnInit(): void {
  }

}
