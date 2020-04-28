import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-blog-filter',
  templateUrl: './blog-filter.component.html',
  styleUrls: ['./blog-filter.component.scss']
})
export class BlogFilterComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  isLoadingResults = true;
  recentPost;
  blogCategory;
  private subcription: Subscription;
  constructor(private api: ApiService, private router: Router, private sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.getFilter();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  getFilter() {
    this.subcription = this.api.getFilter()
      .subscribe(res => {
        this.recentPost = res[0];
        this.blogCategory = res[1];
        // this.blogCategory = res[1];
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  filter(id) {
    this.sharedData.setCategoryId(id);
  }
}
