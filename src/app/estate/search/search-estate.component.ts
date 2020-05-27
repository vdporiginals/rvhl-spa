import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
