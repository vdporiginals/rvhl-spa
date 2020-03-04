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
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {}

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
