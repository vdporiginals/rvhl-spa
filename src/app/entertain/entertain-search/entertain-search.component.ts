import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-entertain-search',
  templateUrl: './entertain-search.component.html',
  styleUrls: ['./entertain-search.component.scss']
})
export class EntertainSearchComponent implements OnInit {
  searchForm: FormGroup;
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
    this.shared.setEntertainFormData(this.searchForm.value);
  }
}
