import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { TourItem } from 'src/app/shared/tour-item';
import { ThemePalette } from '@angular/material/core';
import { Event, Router, ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  navItems: any[] = TourItem;
  background: ThemePalette = undefined;
  isTourPage = false;
  isDetail = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const params = this.route.snapshot.firstChild.firstChild.params;
        const path = this.route.snapshot.firstChild.url[0].path;
        if (path === 'ha-long-bay-tour' && Object.keys(params).length === 0) {
          this.isTourPage = true;
          this.isDetail = false;
        } else if (path === 'tron-goi' && Object.keys(params).length === 0) {
          this.isTourPage = true;
          this.isDetail = false;
        } else if (path === 'di-chuyen' && Object.keys(params).length === 0) {
          this.isTourPage = false;
          this.isDetail = false;
        } else {
          this.isTourPage = false;
          this.isDetail = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.background = 'primary';
  }
}
