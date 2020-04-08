
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

interface DataLogin {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: DataLogin = {};
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  constructor(private dialogRef: MatDialogRef<LoginComponent>) {
  }
  ngOnInit() {
  }



  public closeMe() {
    this.dialogRef.close();
  }

  authFacebook() { }
  authGoogle() { }
}
