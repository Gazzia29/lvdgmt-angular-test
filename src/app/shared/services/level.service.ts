import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private id!: number;
  levelChange: EventEmitter<number> = new EventEmitter();

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
