import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Event, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { ImageOverlayService } from '../shared/image-overlay/image-overlay.service';
import { ImageOverlayRef } from '../shared/image-overlay/image-overlay-ref';

@Component({
  selector: 'app-entertain',
  templateUrl: './entertain.component.html',
  styleUrls: ['./entertain.component.scss']
})
export class EntertainComponent implements OnInit {
  background: ThemePalette = undefined;
  isEntertainPage = false;
  isDetail = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const params = this.route.snapshot.firstChild.params;
        if (Object.keys(params).length === 0) {
          this.isEntertainPage = true;
          this.isDetail = false;
        } else {
          this.isEntertainPage = false;
          this.isDetail = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.background = 'primary';
  }
}
