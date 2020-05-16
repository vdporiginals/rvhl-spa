import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { EstateItem } from './estate-item';
import { Event, NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit {
  navItems: any[] = EstateItem;
  background: ThemePalette = undefined;
  typeSearch;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const path = this.route.snapshot.firstChild.url[0].path;
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
