import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private titleService: Title,
    private metaTagService: Meta) { }

  setTitle(title: string) {
    this.titleService.setTitle(title);

  }

  setDescription(desc: string) {
    this.metaTagService.updateTag(
      { name: 'description', content: desc }
    );
    this.metaTagService.updateTag({ property: 'og:description', content: desc });
  }

  setKeywords(keyword: string) {
    this.metaTagService.updateTag(
      { name: 'keywords', content: keyword }
    );
    this.metaTagService.updateTag({ name: 'travel_keywords', content: keyword });
  }

  setOgUrl(url: string) {
    this.metaTagService.updateTag({ property: 'og:url', content: url });
    this.metaTagService.updateTag({ property: 'og:type', content: 'website' });
    this.metaTagService.updateTag({ property: 'fb:app_id', content: environment.facebookId });
    this.metaTagService.updateTag({ property: 'og:rich_attachment', content: 'true' });
  }
  setOgSite(url: string) {
    this.metaTagService.updateTag({ property: 'og:site_name', content: url });
  }
}
