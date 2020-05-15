import { Component, OnInit } from '@angular/core';
import { faFacebookMessenger, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faFacebookSquare = faFacebookSquare;
  faFacebookMessenger = faFacebookMessenger;
  constructor() { }

  ngOnInit(): void { }
}
