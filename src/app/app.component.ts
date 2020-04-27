import { Component, OnInit } from '@angular/core';
import { AuthClientService } from './shared/services/auth-client.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthClientService, private metaTagService: Meta) {
    // if (this.localStorage.getItem('api_token') === null) {
    //   this.auth.signInApi();
    // }
  }

  ngOnInit(): void {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Review hạ long, chia sẻ hạ long, du lịch hạ long' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Review Hạ Long team' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2020-5-01', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
  }
}
