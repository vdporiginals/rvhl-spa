import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Event, NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-side-filter',
  templateUrl: './right-side-filter.component.html',
  styleUrls: ['./right-side-filter.component.scss']
})
export class RightSideFilterComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  isLoadingResults = true;
  recentPost;
  estateCategory;
  recentReviews;
  fbPlugin: any;
  routePosition;
  private subcription: Subscription;
  results: any;
  queryField: FormControl = new FormControl();

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const path = this.route.snapshot.parent.url[0].path;
        if (path === 'khach-san') {
          this.getFilter('hotel');
          this.routePosition = path;
        } else if (path === 'homestay') {
          this.routePosition = path;
          this.getFilter('homestay');
        } else if (path === 'villa') {
          this.routePosition = path;
          this.getFilter('villa');
        }
      }
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getFilter(type: string) {
    this.subcription = this.api.getFilterEstate(type)
      .subscribe(res => {
        this.recentPost = res[0];
        this.estateCategory = res[1];
        this.fbPlugin = res[2];
        this.isLoadingResults = true;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  filter(id) {
    this.sharedData.setEstateCategory(id);
  }


}
