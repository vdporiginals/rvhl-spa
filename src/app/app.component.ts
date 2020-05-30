import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { AuthClientService } from './shared/services/auth-client.service';
import { Meta } from '@angular/platform-browser';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { LoaderService } from './shared/services/loader.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  loading = false;
  color: ThemePalette = 'primary';

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private loaderService: LoaderService,
    public auth: AuthClientService,
    private metaTagService: Meta) {
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
    this.metaTagService.addTags([
      { name: 'googlebot', content: 'all, index, follow' },
      { name: 'robots', content: 'index, follow' },
      { name: 'copyright', content: 'reviewhalong.vn' },
      { name: 'author', content: 'Review Hạ Long team' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2020-5-01', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
  }

  ngAfterViewInit() {
    const loadSpinner = this.renderer.selectRootElement('#loader');
    loadSpinner.style.display = 'none';
  }
}
