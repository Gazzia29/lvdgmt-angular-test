import { EventEmitter, Injectable } from '@angular/core';
import { Time } from '@app/shared/types/Time';
import { TimeObject } from '@app/shared/types/TimeObject';
import { SceneService } from './scene.service';
@Injectable({
  providedIn: 'root',
})
export class TimeService implements Time {
  timeChanged: EventEmitter<TimeObject> = new EventEmitter();

  hours: number;
  minutes: number;
  day: number;
  period: number;
  smallPeriod: number;

  loop: any;
  defaultSpeed = 20;
  periods: string[] = ['aube', 'journée', 'crépuscule', 'nuit'];
  periodHours: number[][] = [
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21],
    [22, 23, 0, 1, 2, 3, 4],
  ];

  constructor() {
    this.hours = 10;
    this.minutes = 0;
    this.day = 0;
    this.period = 0;
    this.smallPeriod = 0;
    this.setAdequatePeriod();
  }

  getMinutes(): number {
    return this.minutes;
  }

  addMinute(): void {
    if (this.minutes + 1 === 60) {
      this.minutes = 0;
      this.addHour();
    } else {
      this.minutes++;
    }
  }

  getHours(): number {
    return this.hours;
  }

  addHour(): void {
    if (this.hours + 1 === 24) {
      this.hours = 0;
      this.addDay();
    } else {
      this.hours++;
    }

    this.setAdequatePeriod();
    this.printString();
    this.timeChanged.emit(this.getTimeObject());
  }

  addDay(): void {
    this.day++;
  }

  getPeriod(): number {
    return this.period;
  }

  setAdequatePeriod(): void {
    if (this.isNowMorning()) {
      this.period = 0;
    }
    if (this.isNowDay()) {
      this.period = 1;
    }
    if (this.isNowEvening()) {
      this.period = 2;
    }
    if (this.isNowNight()) {
      this.period = 3;
    }
  }

  isNowMorning(): boolean {
    return this.periodHours[0].includes(this.hours) && this.period !== 0;
  }
  isNowDay(): boolean {
    return this.periodHours[1].includes(this.hours) && this.period !== 1;
  }
  isNowEvening(): boolean {
    return this.periodHours[2].includes(this.hours) && this.period !== 2;
  }
  isNowNight(): boolean {
    return this.periodHours[3].includes(this.hours) && this.period !== 3;
  }

  start(): void {
    this.loop = setInterval(() => {
      this.addMinute();
    }, this.defaultSpeed);
  }

  resetLoop(): void {
    clearInterval(this.loop);
    this.start();
  }

  ellipse(min: number, totalspeed: number): void {
    const dummyDate: Date = new Date(
      `2000/01/01 ${this.hours}:${this.minutes}`
    );
    const newDate: Date = new Date(dummyDate.getTime() + min * 60000);
    let minutesAfterAdd: number = newDate.getMinutes();
    let hoursAfterAdd: number = newDate.getHours();
    const dayAfterAdd: number = this.day + (newDate.getDate() - 1);

    while (minutesAfterAdd > 59) {
      minutesAfterAdd -= 60;
      ++hoursAfterAdd;
      if (hoursAfterAdd > 23) {
        hoursAfterAdd = 0;
      }
    }

    const speed = totalspeed ? (totalspeed * 1000) / min : 0.01 * 1000;

    clearInterval(this.loop);

    this.loop = setInterval(() => {
      this.addMinute();
      if (this.minutes === minutesAfterAdd && this.hours === hoursAfterAdd) {
        this.resetLoop();
      }
    }, speed);
  }

  printString(): void {
    console.log(
      `⌚ ${this.hours}h, ${this.periods[this.period]}, day ${this.day}`
    );
  }

  getTimeObject(): TimeObject {
    return {
      hours: this.getHours(),
      minutes: this.getMinutes(),
      period: this.getPeriod(),
    };
  }
}
