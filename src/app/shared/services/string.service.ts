import { Injectable } from '@angular/core';
import Strings from '../strings.json';
import { PlayerService } from './player.service';
@Injectable({
  providedIn: 'root',
})
export class StringService {
  constructor(private playerService: PlayerService) {}

  get(stringID: any): any {
    const stringObj = Strings.find((s) => s.id === stringID);
    const rawString = stringObj?.content || '';
    return this.format(rawString);
  }

  format(str: string): string {
    let formatted = this.lineReturns(str);
    formatted = this.genre(formatted);
    formatted = this.bold(formatted);
    formatted = this.playerName(formatted);
    return formatted;
  }

  genre(str: string): string {
    const genre = this.playerService.getGenre();
    if (genre === 'm') {
      return str.replace(/\{f:+[^}]*\}/g, '').replace(/\{m:([^}]*)\}/g, '$1');
    } else {
      return str.replace(/\{m:+[^}]*\}/g, '').replace(/\{f:([^}]*)\}/g, '$1');
    }
  }

  lineReturns(str: string): string {
    return str.replace(/\/{2}/g, '<br>');
  }

  bold(str: string): string {
    return str.replace(/\*+([^*]*)\*/g, '<strong>$1</strong>');
  }

  playerName(str: string): string {
    const name = this.playerService.getName();
    return str.replace(/@name/g, this.toTitleCase(name));
  }

  toTitleCase(str: string): string {
    return str
      .toLocaleLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toLocaleUpperCase() + s.substring(1))
      .join(' ');
  }
}
