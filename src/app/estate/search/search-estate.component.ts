import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
@Component({
  selector: 'app-estate-search',
  templateUrl: './search-estate.component.html',
  styleUrls: ['./search-estate.component.scss']
})
export class SearchEstateComponent implements OnInit {
  searchForm: FormGroup;
  faSearch = faSearch;
  @Input() typeSearch;
  constructor(public fb: FormBuilder, private shared: SharedDataService) {
    this.searchForm = this.fb.group({
      name: [''],
      // type: this.typeSearch,
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
