import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  results: any;
  queryField: FormControl = new FormControl();
  descriptionLength;
  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.queryField.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        map(val => val.length >= 3 ? val : null),
        switchMap((query) => {
          if (query === null) {
            return;
          } else {
            return this.api.searchByName(query, 'blogs');
          }
        })
      ).subscribe((result: any) => {
        this.results = result.data;
      });
  }


}
