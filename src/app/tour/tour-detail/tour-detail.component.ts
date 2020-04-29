import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  tourDetail;
  tbData: any = [];
  isBrowser: boolean;
  tourImages: any = [];
  displayedColumns: string[] = ['timeStart', 'location', 'service', 'timeEnd'];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private seo: SeoService,
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    this.getTour();
  }

  getTour() {
    this.http.get(`${environment.apiUrl}/tours/${this.route.snapshot.params.id}`).subscribe((data: any) => {
      this.tourDetail = data;
      this.tbData.push(data.data.schedule);
      this.tourImages = data.images;
      console.log(data);
    }, err => {
      console.log(err);
    }, () => { });
  }
}
