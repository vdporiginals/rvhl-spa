import { Component, OnInit } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';
import { TourItem } from 'src/app/shared/tour-item';
import { ThemePalette } from '@angular/material/core';
import { ShortNumberPipe } from '../shared/pipe/short-num.pipe';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  navItems: any[] = TourItem;
  background: ThemePalette = undefined;
  constructor(
    private seo: SeoService) { }

  ngOnInit(): void {
    this.background = 'primary';
    this.seo.setTitle('Tour du lịch Hạ Long');
    this.seo.setDescription('Đánh giá tour vịnh, khách sạn, xe cộ ở Hạ Long bởi người bản địa');
  }
}
