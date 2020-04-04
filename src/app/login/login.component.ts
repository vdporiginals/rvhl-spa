import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';

  constructor(private dialog: MatDialog, private router: Router) { }
  login() {
    if (this.email === 'email@email.com' && this.password === 'p@ssw0rd') {
      this.router.navigate(['success']);
    } else {
      // this.dialog.open(MessageComponent, {
      //   data: {
      //     message: 'Error!!!'
      //   }
      // });
    }
  }
  ngOnInit() {

  }
}
