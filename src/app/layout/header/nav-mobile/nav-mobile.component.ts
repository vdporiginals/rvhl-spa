import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/shared/nav-item.interface';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})
export class NavMobileComponent implements OnInit {
  navItems = NavItem;
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
  }

  loginDialog() {
    this.dialog.open(LoginComponent);
  }

  registerDialog() { }

}
