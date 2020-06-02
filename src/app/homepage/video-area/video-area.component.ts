import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
@Component({
  selector: 'app-video-area',
  templateUrl: './video-area.component.html',
  styleUrls: ['./video-area.component.scss']
})
export class VideoAreaComponent implements OnInit {
  faPlay = faPlay;
  @Input() videoBg;

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  openVideo() {
    console.log(this.videoBg);
    this.dialog.open(VideoDialogComponent, {
      data: {
        link: this.videoBg
      },
      width: 'auto',
      panelClass: 'my-dialog'
    });
  }
}
