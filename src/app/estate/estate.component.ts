import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { EstateItem } from './estate-item';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit {
  navItems: any[] = EstateItem;
  background: ThemePalette = undefined;
  constructor() { }

  ngOnInit(): void {
    this.background = 'primary';
  }
}
