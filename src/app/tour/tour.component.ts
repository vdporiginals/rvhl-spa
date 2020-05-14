import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';
import { TourItem } from 'src/app/shared/tour-item';
import { ThemePalette } from '@angular/material/core';
import { ShortNumberPipe } from '../shared/pipe/short-num.pipe';
import { isPlatformServer } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedDataService } from '../shared/services/shared-data.service';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  navItems: any[] = TourItem;
  searchForm: FormGroup;
  background: ThemePalette = undefined;
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
    this.background = 'primary';
  }

  sendFormData() {
    this.shared.setFormData(this.searchForm.value);
  }
}
