import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  background: ThemePalette = undefined;
  typeSearch;

  isDetail = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const params = this.route.snapshot.firstChild.params;
        if (Object.keys(params).length === 0) {
          this.isDetail = false;
        } else {
          this.isDetail = true;
        }
      }
    });
  }
  ngOnInit(): void {

    this.background = 'primary';
  }
}
