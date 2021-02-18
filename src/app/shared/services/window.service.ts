import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  size: any;
  windowChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  setSize(value: any): void {
    this.size = value;
    this.windowChange.emit();
  }
  getSize(): any {
    return this.size;
  }
}
