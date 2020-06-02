import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-entertain-filter',
  templateUrl: './entertain-filter.component.html',
  styleUrls: ['./entertain-filter.component.scss']
})
export class EntertainFilterComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  isLoadingResults = true;
  recentPost;
  entertainCategory;
  recentReviews;
  fbPlugin: any;
  private subcription: Subscription;
  results: any;
  pathUrl;
  isDetail;
  queryField: FormControl = new FormControl();

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private sharedData: SharedDataService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const params = this.route.snapshot.firstChild.params;
        if (Object.keys(params).length === 0) {
          this.isDetail = false;
        } else {
          this.isDetail = true;
        }
        this.pathUrl = `/entertains`;
        this.getFilter('entertains');
      }
    });
  }

  ngOnInit(): void {

    // this.getFilter();
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getFilter(type) {
    this.subcription = this.api.getFilterEntertain(type)
      .subscribe(res => {
        this.recentPost = res[0];
        this.entertainCategory = res[1];
        this.fbPlugin = res[2];
        this.isLoadingResults = true;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  filter(id) {
    this.sharedData.setEntertainCategory(id);
  }

  filterIsDetail(id) {
    this.sharedData.setEntertainCategory(id);
    this.router.navigate([`/entertain${this.pathUrl}`], { state: { category: id } });
  }
}
