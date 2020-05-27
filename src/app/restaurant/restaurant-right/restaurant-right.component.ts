import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-restaurant-right',
  templateUrl: './restaurant-right.component.html',
  styleUrls: ['./restaurant-right.component.scss']
})
export class RestaurantRightComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  isLoadingResults = true;
  recentPost;
  restaurantCategory;
  recentReviews;
  fbPlugin: any;
  private subcription: Subscription;
  results: any;
  queryField: FormControl = new FormControl();

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService) {
    this.getFilter()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  getFilter() {
    this.subcription = this.api.getFilterRestaurant()
      .subscribe(res => {
        this.recentPost = res[0];
        this.restaurantCategory = res[1];
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
