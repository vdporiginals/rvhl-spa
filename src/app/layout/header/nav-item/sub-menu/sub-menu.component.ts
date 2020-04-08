import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  @Output() mouseenter2 = new EventEmitter();
  @Output() mouseleave2 = new EventEmitter();

  @Input() subMenu;

  @ViewChild('childMenu', { static: true }) public childMenu: any;

  constructor() {}

  ngOnInit(): void {}
}
