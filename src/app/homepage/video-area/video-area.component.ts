import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-video-area',
  templateUrl: './video-area.component.html',
  styleUrls: ['./video-area.component.scss']
})
export class VideoAreaComponent implements OnInit {
  faPlay = faPlay;
  constructor() {}

  ngOnInit(): void {}
}
