import { Injectable } from '@angular/core';
import Strings from '../strings.json';
@Injectable({
  providedIn: 'root',
})
export class StringService {
  constructor() {}

  get(stringID: any): any {
    const stringObj = Strings.find((s) => s.id === stringID);
    return stringObj?.content || '';
  }
}
