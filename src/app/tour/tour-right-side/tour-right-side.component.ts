import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-right-side',
  templateUrl: './tour-right-side.component.html',
  styleUrls: ['./tour-right-side.component.scss']
})
export class TourRightSideComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  isLoadingResults = true;
  recentPost;
  tourCategory;
  recentReviews;
  fbPlugin: any;
  private subcription: Subscription;
  results: any;
  queryField: FormControl = new FormControl();

  constructor(private api: ApiService, private router: Router, private sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.getFilter();
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getFilter() {
    this.subcription = this.api.getFilterTour()
      .subscribe(res => {
        this.recentPost = res[0];
        this.tourCategory = res[1];
        this.fbPlugin = res[2];
        this.recentReviews = res[3];
        this.isLoadingResults = true;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  filter(id) {
    this.sharedData.setTourCategory(id);
  }

}
