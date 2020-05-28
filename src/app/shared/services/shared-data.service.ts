import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private blogId: string;
  private storageName = 'BlogId';
  private categoryId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private reviewCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private estateCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private tourCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private transferCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private entertainCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private restaurantCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private searchForm: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private searchEstate: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private searchEntertain: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private searchRestaurant: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private searchTransfer: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged = this.isLoggedIn.asObservable();
  categoryIdd = this.categoryId.asObservable();
  reviewCategoryId = this.reviewCategory.asObservable();
  entertainCategoryId = this.entertainCategory.asObservable();
  transferCategoryId = this.transferCategory.asObservable();
  estateCategoryId = this.estateCategory.asObservable();
  restaurantCategoryId = this.restaurantCategory.asObservable();
  tourCategoryId = this.tourCategory.asObservable();

  searchFormData = this.searchForm.asObservable();
  restaurantFormData = this.searchRestaurant.asObservable();
  entertainFormData = this.searchEntertain.asObservable();
  transferFormData = this.searchTransfer.asObservable();
  estateFormData = this.searchEstate.asObservable();
  constructor() { }

  setCategoryId = (val: string) => {
    this.categoryId.next(val);
  }

  setReviewCategory = (val: string) => {
    this.reviewCategory.next(val);
  }

  setEntertainCategory = (val: string) => {
    this.entertainCategory.next(val);
  }

  setTransferCategory = (val: string) => {
    this.transferCategory.next(val);
  }

  setEstateCategory = (val: string) => {
    this.estateCategory.next(val);
  }

  setRestaurantCategory = (val: string) => {
    this.restaurantCategory.next(val);
  }

  setTourCategory = (val: string) => {
    this.tourCategory.next(val);
  }

  setFormData = (val: any) => {
    this.searchForm.next(val);
  }

  setEstateFormData = (val: any) => {
    this.searchEstate.next(val);
  }

  setTransferFormData = (val: any) => {
    this.searchTransfer.next(val);
  }

  setRestaurantFormData = (val: any) => {
    this.searchRestaurant.next(val);
  }

  setEntertainFormData = (val: any) => {
    this.searchEntertain.next(val);
  }

  setLogged = (val: boolean) => {
    this.isLoggedIn.next(val);
  }
}
