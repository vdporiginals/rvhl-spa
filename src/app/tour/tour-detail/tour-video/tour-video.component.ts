import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tour-video',
  templateUrl: './tour-video.component.html',
  styleUrls: ['./tour-video.component.scss']
})
export class TourVideoComponent implements OnInit {
  player: YT.Player;
  idYoutube: any;
  // public idYoute = 'qDuKsiwS5xw';


  constructor(private dialogRef: MatDialogRef<TourVideoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.idYoutube = this.data.link;
  }

  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }

  onStateChange(event) {
    // console.log('player state', event.data);
  }

  close() {
    this.dialogRef.close();
  }

}
