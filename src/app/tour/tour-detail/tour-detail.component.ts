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

  constructor(private http: HttpClient, private route: ActivatedRoute, private seo: SeoService) { }

  ngOnInit(): void {
    this.getTour();
  }

  getTour() {
    this.http.get(`${environment.apiUrl}/tours/${this.route.snapshot.params.id}`).subscribe(data => {
      this.tourDetail = data;
      console.log(data);
    }, err => {
      console.log(err);
    }, () => { });
  }
}
