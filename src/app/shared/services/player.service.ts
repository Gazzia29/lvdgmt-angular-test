import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}

  private genre = 'm';
  private name = 'Joseph';

  getGenre(): string {
    return this.genre;
  }

  setGenre(value: string): void {
    if (['m', 'f'].includes(value)) this.genre = value;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
