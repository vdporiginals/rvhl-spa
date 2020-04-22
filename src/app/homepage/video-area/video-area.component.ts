import { Component, OnInit, Input } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
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
    console.log(this.videoBg);
  }

  ngOnInit(): void { }

  openVideo() {
    this.dialog.open(VideoDialogComponent, {
      width: 'auto',
      panelClass: 'my-dialog'
    });
  }
}
