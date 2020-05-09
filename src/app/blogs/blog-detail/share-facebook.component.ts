import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'share-fb-button',
    template: '<iframe src="https://www.facebook.com/plugins/share_button.php?href={{appUrl}}}&layout=button_count&size=small&appId=641193026445878&width=120&height=20" width="120" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>',
})

export class ShareButtonComponent {
    appUrl;
    constructor(
        private injector: Injector,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        console.log('hi, we\'re here!');
        if (isPlatformServer(this.platformId)) {
            let req = this.injector.get('request');
            this.appUrl = req.get('host');
        } else {
            this.appUrl = window.location.href;
        }
    }

}
