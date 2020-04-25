import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private toastr: ToastrService) { }

  showSuccess() {
    return this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showError() {
    return this.toastr.error('Hello world!', 'Toastr fun!');
  }

  showWarning() {
    return this.toastr.warning('Hello world!', 'Toastr fun!');
  }
}
