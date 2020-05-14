import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { TourItem } from 'src/app/shared/tour-item';
import { ThemePalette } from '@angular/material/core';
import { Event, Router } from '@angular/router';
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
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/tour/ha-long-bay-tour') {
          this.isTourPage = true;
        } else if (event.url === '/tour/tron-goi') {
          this.isTourPage = true;
        } else {
          this.isTourPage = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.background = 'primary';
  }
}
