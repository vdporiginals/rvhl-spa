import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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
  }

  setOgUrl(url: string) {
    this.metaTagService.updateTag({ name: 'og:url', content: url });
  }
}
