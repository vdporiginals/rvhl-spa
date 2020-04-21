import { Component, OnInit } from '@angular/core';
import { AuthClientService } from './shared/services/auth-client.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rvhl-spa';

  constructor(public auth: AuthClientService, private localStorage: LocalStorageService) {
    // if (this.localStorage.getItem('api_token') === null) {
    //   this.auth.signInApi();
    // }
  }

  ngOnInit(): void {
  }
}
