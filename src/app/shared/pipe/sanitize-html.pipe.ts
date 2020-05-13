import { Pipe, PipeTransform, SecurityContext, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object) { }
  transform(value: any): any {
    if (isPlatformBrowser(this.platformId)) {
      const doc = new DOMParser().parseFromString(value, 'text/html');
      return this.sanitizer.bypassSecurityTrustHtml(doc.documentElement.textContent);
    }
  }
}
