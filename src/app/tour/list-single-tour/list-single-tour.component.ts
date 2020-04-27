import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-list-single-tour',
  templateUrl: './list-single-tour.component.html',
  styleUrls: ['./list-single-tour.component.scss']
})
export class ListSingleTourComponent implements OnInit {
  tourData: any = {};
  constructor(private http: HttpClient, private route: ActivatedRoute, private seo: SeoService) { }

  ngOnInit(): void {
    this.getTour();
    this.seo.setTitle(`Các loại Tour du lịch Hạ Long`);
    this.seo.setDescription('Đánh giá tour vịnh, khách sạn, xe cộ ở Hạ Long bởi người bản địa');
  }

  getTour() {
    this.http.get(`${environment.apiUrl}/tours`, {
      params: {
        select: 'title,services,description,images,seo,schedule,price',
        limit: '3',
        category: this.route.snapshot.data.category
      }
    }).subscribe(data => {
      this.tourData = data;
      console.log(data);
    }, err => {
      console.log(err);
    }, () => { });
  }

}
