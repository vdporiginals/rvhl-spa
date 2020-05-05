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
    this.metaTagService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaTagService.updateTag({ name: 'author', content: 'Review Hạ long team' });
    this.metaTagService.updateTag({ name: 'copyright', content: 'Review Hạ long team' });
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
