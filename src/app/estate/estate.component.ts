import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { EstateItem } from './estate-item';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit {
  navItems: any[] = EstateItem;
  background: ThemePalette = undefined;
  typeSearch;

  isDetail = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const path = this.route.snapshot.firstChild.url[0].path;
        const params = this.route.snapshot.firstChild.firstChild.params;
        if (Object.keys(params).length === 0) {
          this.isDetail = false;
        } else {
          this.isDetail = true;
        }

        if (path === 'khach-san') {
          this.typeSearch = 'hotel';
        } else if (path === 'homestay') {
          this.typeSearch = 'homestay';
        } else if (path === 'villa') {
          this.typeSearch = 'villa';
        }
      }
    });
  }
  ngOnInit(): void {
    this.background = 'primary';

  }
}
