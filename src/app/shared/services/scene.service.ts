import { TimeService } from './time.service';
import { EventEmitter, Injectable } from '@angular/core';
import { LevelService } from './level.service';
import Scenes from '../scenes.json';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  sceneType: any;
  backgroundElements: any[];
  constructor(private timeService: TimeService, levelService: LevelService) {
    this.backgroundElements = [];
    this.setSceneFromId(0);
    levelService.levelChange.subscribe((id: number) => {
      this.setSceneFromId(id);
    });
  }
  sceneChange: EventEmitter<any> = new EventEmitter();

  setSceneFromId(id: number): void {
    const sceneObject = Scenes.find((s) => s.id === id);
    if (sceneObject) {
      this.setSceneType(sceneObject.scene.exterior ? 'exterior' : 'interior');
      this.setBackgroundElements(sceneObject.scene.elements);
      this.sceneChange.emit();
    }
  }

  getSceneType(): string {
    return this.sceneType;
  }

  setSceneType(value: string): void {
    this.sceneType = value;
  }

  getBackgroundElements(): any[] {
    return this.backgroundElements;
  }

  setBackgroundElements(value: any[]): void {
    this.backgroundElements = value;
  }

  getBackgroundTimePeriod(): any {
    const time = this.timeService.getHours();
    return [
      0,
      0,
      2,
      2,
      4,
      4,
      6,
      6,
      8,
      8,
      10,
      10,
      12,
      12,
      14,
      14,
      16,
      16,
      18,
      18,
      20,
      20,
      22,
      22,
    ][time];
  }

  getSceneObject(): any {
    return {
      sceneType: this.getSceneType(),
      bgPeriod: this.getBackgroundTimePeriod(),
      backgroundElements: this.getBackgroundElements(),
    };
  }
}
