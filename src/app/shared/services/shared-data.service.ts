import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private blogId: string;
  private storageName = 'BlogId';
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged = this.isLoggedIn.asObservable();

  constructor() { }


  setLogged = (val: boolean) => {
    this.isLoggedIn.next(val);
  }

  setBlogId(value) {
    this.blogId = value;
  }

  getBlogId() {
    return this.blogId;
  }

  saveBlogId(data: any) {
    localStorage.setItem(this.storageName, this.blogId);
  }

  clearBlogId() {
    localStorage.removeItem(this.storageName);
  }
}
