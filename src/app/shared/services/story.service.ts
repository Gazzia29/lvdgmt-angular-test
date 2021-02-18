import { StringLogicService } from './stlogic.service';
import { EventEmitter, Injectable } from '@angular/core';
import { LevelService } from './level.service';
import Stories from '../stories.json';
import Strings from '../strings.json';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(
    private levelService: LevelService,
    private timeService: TimeService,
    private stringLogicService: StringLogicService
  ) {
    this.setStoryFromId(0);
    levelService.levelChange.subscribe((id: number) => {
      this.setStoryFromId(id);
    });
    timeService.timeChanged.subscribe(() => {
      this.setStoryFromId(levelService.getId());
    });
  }
  title = '';
  main: any;

  storyChange: EventEmitter<any> = new EventEmitter();

  setStoryFromId(id: any): void {
    const storyObject = Stories.find((s) => s.id === id);
    if (!storyObject) return;

    this.setTitle(storyObject.title);
    this.setMainFromObj(storyObject.main);
    this.storyChange.emit();
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }

  setMainFromObj(data: any[]): void {
    const appropriateStory = data.find((m) => {
      return this.stringLogicService.checkConditions(m.conditions);
    });
    if (!appropriateStory) return;
    const stringObject = Strings.find(
      (s) => s.id === appropriateStory.string_id
    );
    if (!stringObject) return;
    this.main = stringObject.content;
  }

  getMain(): any {
    return this.main;
  }
}
