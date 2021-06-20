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
  storyChange: EventEmitter<any> = new EventEmitter();

  title = '';
  actions: any;
  main: any;

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

  setStoryFromId(id: any): void {
    const storyObject = Stories.find((s) => s.id === id);
    if (!storyObject) return;

    this.setTitleFromObj(storyObject.title_id);
    this.setMainFromObj(storyObject.main);
    this.setActionsFromObj(storyObject.actions);
    this.storyChange.emit();
  }

  setTitleFromObj(titleID: string): void {
    this.title = this.stringSVC.get(titleID);
  }

  setMainFromObj(data: any[]): void {
    const appropriateStory = data.find((m) =>
      this.stringLogicSVC.checkConditions(m.conditions)
    );
    if (!appropriateStory) return;
    this.main = this.stringSVC.get(appropriateStory.string_id);
  }

  setActionsFromObj(data: any[]): void {
    console.log(data);
    const appropriateActions = data.filter(
      (a) => this.stringLogicSVC.checkConditions(a.conditions) || a.forceShow
    );
    if (!appropriateActions) return;

    const formattedActions = appropriateActions.map((a) => {
      const descObject = a.desc.find((d: any) =>
        this.stringLogicSVC.checkConditions(d.conditions)
      );
      return {
        conditionStrings: this.stringLogicSVC.getConditionsNames(a.conditions),
        title: this.stringSVC.get(a.title_id),
        desc: this.stringSVC.get(descObject.string_id),
        forceShow:
          a.forceShow && !this.stringLogicSVC.checkConditions(a.conditions),
        pointsCost: a.pointsCost,
      };
    });
    console.log(formattedActions);
    this.actions = formattedActions;
  }

}
