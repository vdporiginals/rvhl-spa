import { Injectable, Inject, OnInit, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { ImageOverlayComponent } from './image-overlay.component';

import { ImageOverlayRef } from './image-overlay-ref';
import { IMAGE_DIALOG_DATA } from './image-overlay.token';

export interface Image {
    name: string;
    url: string;
}

interface ImageDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    image?: Image;
}

const DEFAULT_CONFIG: ImageDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-dark-backdrop',
    panelClass: 'tm-file-preview-dialog-panel',
    image: null
}

@Injectable({ providedIn: 'root' })
export class ImageOverlayService {

    constructor(
        private injector: Injector,
        private overlay: Overlay) { }

    open(config: ImageDialogConfig = {}) {
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(dialogConfig);

        // Instantiate remote control
        const dialogRef = new ImageOverlayRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private createOverlay(config: ImageDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(overlayRef: OverlayRef, config: ImageDialogConfig, dialogRef: ImageOverlayRef) {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(ImageOverlayComponent, null, injector);
        const containerRef: ComponentRef<ImageOverlayComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(config: ImageDialogConfig, dialogRef: ImageOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(ImageOverlayRef, dialogRef);
        injectionTokens.set(IMAGE_DIALOG_DATA, config.image);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(config: ImageDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}