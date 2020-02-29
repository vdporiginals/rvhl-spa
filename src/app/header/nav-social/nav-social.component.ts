import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-nav-social',
  templateUrl: './nav-social.component.html',
  styleUrls: ['./nav-social.component.scss']
})
export class NavSocialComponent implements OnInit {
  faFacebookMessenger = faFacebookMessenger;
  faEnvelope = faEnvelope;
  faFacebook = faFacebook;
  constructor() {}

  ngOnInit(): void {}
}
