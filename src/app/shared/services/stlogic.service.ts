import { LevelService } from './level.service';
import { Injectable } from '@angular/core';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root',
})
export class StringLogicService {
  constructor(
    private timeService: TimeService,
    private levelService: LevelService
  ) {}

  checkConditions(conditions: string[][]): boolean {
    return conditions.every((c) => {
      return this.logicController(c);
    });
  }
  logicController(logicArray: string[]): boolean {
    const type = logicArray[0];

    if (type === 'timeperiod') {
      return this.timePeriod(logicArray);
    }
    if (type === 'level') {
      return this.level(logicArray);
    }
    return false;
  }

  level(logicArray: string[]): boolean {
    if (logicArray[1] === 'is') {
      return this.levelService.getId() === +logicArray[2];
    } else if (logicArray[1] === 'set') {
      this.levelService.setId(+logicArray[2]);
      return true;
    } else return false;
  }

  timePeriod(logicArray: string[]): boolean {
    if (logicArray[1] === 'is') {
      return this.timeService.getPeriod() === +logicArray[2];
    } else return false;
  }
}
