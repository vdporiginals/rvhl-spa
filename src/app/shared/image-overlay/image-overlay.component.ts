import { Component, OnInit, Inject } from '@angular/core';
import { IMAGE_DIALOG_DATA } from './image-overlay.token';
import { ImageOverlayRef } from './image-overlay-ref';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.scss']
})
export class ImageOverlayComponent {


  constructor(
    public dialogRef: ImageOverlayRef,
    @Inject(IMAGE_DIALOG_DATA) public image: any) { }
}