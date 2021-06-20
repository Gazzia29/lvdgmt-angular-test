import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  levelChange: EventEmitter<number> = new EventEmitter();
  private id!: number;

  constructor() {
    this.setId(0);
  }

  getId(): number {
    return this.id;
  }
  setId(value: number): void {
    this.id = value;
    this.levelChange.emit(this.id);
  }
}
