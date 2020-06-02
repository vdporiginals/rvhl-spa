import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

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
      limit: 8,
      sort: [''],
      locationStart: ['']
    });
  }

  ngOnInit(): void {
  }

  sendFormData() {
    this.shared.setTransferFormData(this.searchForm.value);
  }
}
