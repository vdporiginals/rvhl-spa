import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit {
  player: YT.Player;
  public idYoute = 'qDuKsiwS5xw';


  constructor(private dialogRef: MatDialogRef<VideoDialogComponent>, ) { }

  ngOnInit(): void {
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  close() {
    this.dialogRef.close();
  }
}
