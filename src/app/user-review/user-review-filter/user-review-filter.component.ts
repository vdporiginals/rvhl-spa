import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-review-filter',
  templateUrl: './user-review-filter.component.html',
  styleUrls: ['./user-review-filter.component.scss']
})
export class UserReviewFilterComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  isLoadingResults = true;
  recentPost;
  blogCategory;
  fbPlugin: any;
  private subcription: Subscription;
  results: any;
  queryField: FormControl = new FormControl();

  constructor(private api: ApiService, private router: Router, private sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.getFilter();
    this.queryField.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        map(val => val.length >= 3 ? val : null),
        switchMap((query) => {
          if (query === null) {
            return;
          } else {
            return this.api.searchByName(query, 'user-reviews');
          }
        })
      ).subscribe((result: any) => {
        this.results = result.data;
      });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  getFilter() {
    this.subcription = this.api.getFilterReview()
      .subscribe(res => {
        this.recentPost = res[0];
        this.blogCategory = res[1];
        this.fbPlugin = res[2];
        this.isLoadingResults = true;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  filter(id) {
    this.sharedData.setReviewCategory(id);
  }
}
