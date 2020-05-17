import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private blogId: string;
  private storageName = 'BlogId';
  private categoryId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private estateCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private tourCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private transferCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private searchForm: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged = this.isLoggedIn.asObservable();
  categoryIdd = this.categoryId.asObservable();
  transferCategoryId = this.transferCategory.asObservable();
  estateCategoryId = this.estateCategory.asObservable();
  tourCategoryId = this.tourCategory.asObservable();
  searchFormData = this.searchForm.asObservable();
  constructor() { }

  setCategoryId = (val: string) => {
    this.categoryId.next(val);
  }

  setTransferCategory = (val: string) => {
    this.transferCategory.next(val);
  }

  setEstateCategory = (val: string) => {
    this.estateCategory.next(val);
  }

  setTourCategory = (val: string) => {
    this.tourCategory.next(val);
  }

  setFormData = (val: any) => {
    this.searchForm.next(val);
  }

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
