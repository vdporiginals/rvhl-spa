import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-entertain-video',
  templateUrl: './entertain-video.component.html',
  styleUrls: ['./entertain-video.component.scss']
})
export class EntertainVideoComponent implements OnInit {
  player: YT.Player;
  idYoutube: any;
  // public idYoute = 'qDuKsiwS5xw';


  constructor(private dialogRef: MatDialogRef<EntertainVideoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
