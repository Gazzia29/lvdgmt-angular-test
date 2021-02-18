import { StringService } from './string.service';
import { StringLogicService } from './stlogic.service';
import { EventEmitter, Injectable } from '@angular/core';
import { LevelService } from './level.service';
import Stories from '../stories.json';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(
    private levelSVC: LevelService,
    private timeSVC: TimeService,
    private stringLogicSVC: StringLogicService,
    private stringSVC: StringService
  ) {
    this.setStoryFromId(0);
    levelSVC.levelChange.subscribe((id: number) => {
      this.setStoryFromId(id);
    });
    timeSVC.timeChanged.subscribe(() => {
      this.setStoryFromId(levelSVC.getId());
    });
  }
  title = '';
  main: any;

  storyChange: EventEmitter<any> = new EventEmitter();

  setStoryFromId(id: any): void {
    const storyObject = Stories.find((s) => s.id === id);
    if (!storyObject) return;

    this.setTitleFromObj(storyObject.title_id);
    this.setMainFromObj(storyObject.main);
    this.storyChange.emit();
  }

  setTitleFromObj(titleID: string): void {
    this.title = this.stringSVC.get(titleID);
  }

  getTitle(): string {
    return this.title;
  }

  setMainFromObj(data: any[]): void {
    const appropriateStory = data.find((m) => {
      return this.stringLogicSVC.checkConditions(m.conditions);
    });
    if (!appropriateStory) return;
    this.main = this.stringSVC.get(appropriateStory.string_id);
  }

  getMain(): any {
    return this.main;
  }
}
