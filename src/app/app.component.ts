import { Component, OnInit } from '@angular/core';
import { AuthClientService } from './shared/services/auth-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rvhl-spa';

  constructor(public auth: AuthClientService) {
    // this.auth.signInApi();
  }

  ngOnInit(): void {
  }
}
