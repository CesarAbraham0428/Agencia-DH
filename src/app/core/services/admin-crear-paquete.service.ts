import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {
  private selectedItemsSource = new BehaviorSubject<any[]>([]);
  selectedItems$ = this.selectedItemsSource.asObservable();

  constructor() { }

  addItem(item: any) {
    const currentItems = this.selectedItemsSource.value;
    this.selectedItemsSource.next([...currentItems, item]);
  }

  removeItem(item: any) {
    const currentItems = this.selectedItemsSource.value;
    this.selectedItemsSource.next(currentItems.filter(i => i !== item));
  }

  clearItems() {
    this.selectedItemsSource.next([]);
  }
}

