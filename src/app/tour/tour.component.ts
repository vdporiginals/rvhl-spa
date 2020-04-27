import { Component, OnInit } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  constructor(
    private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setTitle('Tour du lịch Hạ Long');
    this.seo.setDescription('Đánh giá tour vịnh, khách sạn, xe cộ ở Hạ Long bởi người bản địa');
  }
}
