import { Component, OnInit, Inject } from '@angular/core';
import { AuthClientService } from '../shared/services/auth-client.service';
import { DOCUMENT } from '@angular/common';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  loading = false;
  constructor(private router: Router, public auth: AuthClientService, @Inject(DOCUMENT) private document: Document) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
