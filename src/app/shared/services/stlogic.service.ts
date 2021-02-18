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
    if (conditions) {
      return conditions.every((c) => {
        return this.logicController(c);
      });
    } else return true;
  }

  getConditionsNames(conditions: string[][]): string[] {
    if (conditions) {
      return conditions.map((c) => {
        return this.logicController(c, true);
      });
    } else return [];
  }

  logicController(logicArray: string[], toString?: boolean): any {
    const type = logicArray[0];

    if (type === 'timeperiod') {
      return this.timePeriod(logicArray, toString);
    }
    if (type === 'level') {
      return this.level(logicArray, toString);
    }
    return false;
  }

  level(logicArray: string[], toString?: boolean): any {
    if (logicArray[1] === 'is') {
      if (toString) return `Il faut être quelque part en particulier.`;
      return this.levelService.getId() === +logicArray[2];
    } else if (logicArray[1] === 'set') {
      this.levelService.setId(+logicArray[2]);
      return true;
    } else return false;
  }

  timePeriod(logicArray: string[], toString?: boolean): any {
    const period = this.timeService.getPeriod();
    const operator = logicArray[1];
    const value = +logicArray[2];
    const periodStrs = ['le matin', 'la journée', 'le soir', 'la nuit'];

    if (operator === 'is') {
      if (toString) {
        return `Il faut être ${periodStrs[value]}.`;
      } else {
        return period === value;
      }
    } else if (operator === 'not') {
      if (toString) return `Il ne faut pas être ${periodStrs[value]}.`;
      return period !== value;
    } else return false;
  }
}
