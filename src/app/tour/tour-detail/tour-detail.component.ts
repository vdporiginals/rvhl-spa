import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  tourDetail;
  tbData: any = [];
  displayedColumns: string[] = ['timeStart', 'location', 'service', 'timeEnd'];
  constructor(private http: HttpClient, private route: ActivatedRoute, private seo: SeoService) { }

  ngOnInit(): void {
    this.getTour();
    console.log()
  }

  getTour() {
    this.http.get(`${environment.apiUrl}/tours/${this.route.snapshot.params.id}`).subscribe((data: any) => {
      this.tourDetail = data;
      this.tbData.push(data.data.schedule);
      console.log(this.tbData);
    }, err => {
      console.log(err);
    }, () => { });
  }
}
