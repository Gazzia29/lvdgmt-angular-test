export interface Time {
  hours: number;
  minutes: number;
  day: number;
  period: number;

  loop: any;
  defaultSpeed: number;
  periods: string[];
  periodHours: number[][];

  addMinute(): void;

  addHour(): void;

  addDay(): void;

  setAdequatePeriod(): void;

  isNowMorning(): boolean;
  isNowDay(): boolean;
  isNowEvening(): boolean;
  isNowNight(): boolean;

  start(): void;

  resetLoop(): void;

  ellipse(min: number, totalspeed: number): void;
}
