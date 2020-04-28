import { Component, OnInit } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';
import { SanitizeHtmlPipe } from '../shared/pipe/sanitize-html.pipe';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  categoryId: any;
  constructor(
    private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setTitle('Review du lịch Hạ Long');
    this.seo.setDescription('Đánh giá địa điểm, ăn, ngủ nghỉ ở Hạ Long bởi người bản địa');

  }
}
