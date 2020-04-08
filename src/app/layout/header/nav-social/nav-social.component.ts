import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
@Component({
  selector: 'app-nav-social',
  templateUrl: './nav-social.component.html',
  styleUrls: ['./nav-social.component.scss']
})
export class NavSocialComponent implements OnInit {
  faFacebookMessenger = faFacebookMessenger;
  faEnvelope = faEnvelope;
  faFacebook = faFacebook;

  constructor(private dialog: MatDialog) { }

  loginDialog() {
    this.dialog.open(LoginComponent);
  }

  registerDialog() { }


  ngOnInit(): void { }
}
