import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-transfer-search',
  templateUrl: './transfer-search.component.html',
  styleUrls: ['./transfer-search.component.scss']
})
export class TransferSearchComponent implements OnInit {
  searchForm: FormGroup;
  constructor(public fb: FormBuilder, private shared: SharedDataService) {

    this.searchForm = this.fb.group({
      title: [''],
      price: [''],
      status: true,
      page: 1,
      limit: 4,
      sort: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
  }

  sendFormData() {
    this.shared.setFormData(this.searchForm.value);
  }
}
