import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';
import { TourItem } from 'src/app/shared/tour-item';
import { ThemePalette } from '@angular/material/core';
import { ShortNumberPipe } from '../shared/pipe/short-num.pipe';
import { isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  navItems: any[] = TourItem;
  background: ThemePalette = undefined;
  constructor() { }

  ngOnInit(): void {
    this.background = 'primary';
  }
}
