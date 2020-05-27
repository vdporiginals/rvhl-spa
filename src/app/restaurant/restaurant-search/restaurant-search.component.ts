import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.scss']
})
export class RestaurantSearchComponent implements OnInit {
  searchForm: FormGroup;
  faSearch = faSearch;
  constructor(public fb: FormBuilder, private shared: SharedDataService) {
    this.searchForm = this.fb.group({
      name: [''],
      'price[lte]': [''],
      status: true,
      limit: 8,
      sort: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
  }

  sendFormData() {
    this.shared.setEstateFormData(this.searchForm.value);
  }

}
