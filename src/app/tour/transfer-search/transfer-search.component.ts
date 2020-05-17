import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Event, Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-transfer-search',
  templateUrl: './transfer-search.component.html',
  styleUrls: ['./transfer-search.component.scss']
})
export class TransferSearchComponent implements OnInit {
  searchForm: FormGroup;
  isDetailPage;
  constructor(public fb: FormBuilder, private shared: SharedDataService) {
    this.searchForm = this.fb.group({
      name: [''],
      price: [''],
      status: true,
      limit: 4,
      sort: [''],
      locationStart: ['']
    });
  }

  ngOnInit(): void {
  }

  sendFormData() {
    this.shared.setFormData(this.searchForm.value);
  }
}
