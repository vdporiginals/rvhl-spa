import { InjectionToken } from '@angular/core';

import { Image } from './image-overlay.service';

export const IMAGE_DIALOG_DATA = new InjectionToken<Image>('IMAGE_DIALOG_DATA');