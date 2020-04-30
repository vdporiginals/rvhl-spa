import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Inject,
  HostListener
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThemePalette } from '@angular/material/core';
import { AuthClientService } from 'src/app/shared/services/auth-client.service';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  loading = false;
  color: ThemePalette = 'primary';
  @Output() public sidenavToggle = new EventEmitter();

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
  ngOnInit() { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      document.body.scrollTop > 40 ||
      document.documentElement.scrollTop > 40
    ) {
      document.getElementById('sticky-header').classList.add('sticky');
    } else {
      document.getElementById('sticky-header').classList.remove('sticky');
    }
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
