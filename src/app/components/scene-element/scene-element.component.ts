import { SceneService } from '@app/shared/services/scene.service';
import { WindowService } from './../../shared/services/window.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { LevelService } from '@app/shared/services/level.service';
import { TimeService } from '@app/shared/services/time.service';

@Component({
  selector: 'app-scene-element',
  templateUrl: './scene-element.component.html',
  styleUrls: ['./scene-element.component.scss'],
})
export class SceneElementComponent implements OnInit {
  @Input() element: any;
  style!: string;
  zIndex!: number;
  yPos!: number;
  xPos!: number;
  xFrom!: string;
  yFrom!: string;
  path!: string;
  height!: string;
  width!: string;
  windowSize: any;
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.windowSize = {
      h: window.innerHeight,
      w: window.innerWidth,
    };
  }
  constructor(
    private timeService: TimeService,
    private levelService: LevelService,
    private windowService: WindowService,
    private sceneService: SceneService
  ) {}

  ngOnInit(): void {
    this.setVariablesFromElement();
    this.setStyle();
    this.timeService.timeChanged.subscribe(() => {
      this.setStyle();
    });
  }

  setVariablesFromElement(): void {
    this.style = '';
    this.zIndex = this.element.zIndex || 10;
    this.xPos = this.element.xPos || 0;
    this.yPos = this.element.yPos || 0;
    this.xFrom = this.element.xFrom || 'left';
    this.yFrom = this.element.yFrom || 'bottom';
    const w = this.element.w || 100;
    const h = this.element.h || 100;
    this.windowSize = this.windowService.getSize();

    this.height =
      this.element.hFactor === 'w'
        ? this.windowSize.h * (w / 100) + 'px'
        : h + '%';
    this.width =
      this.element.wFactor === 'h'
        ? this.windowSize.w * (h / 100) + 'px'
        : w + '%';

    this.path = `${this.levelService.getId()}_${this.element.imgName}`;
  }

  getFilter(): string {
    const isFront = this.element.zIndex >= 100;
    const smallperiod = this.sceneService.getBackgroundTimePeriod();

    if ([22, 0, 2].includes(smallperiod)) {
      return isFront
        ? 'filter: saturate(126.3%) brightness(13%) sepia(82%) hue-rotate(-135deg) contrast(104%); '
        : 'filter: saturate(79.3%) brightness(11%) sepia(100%) hue-rotate(-119deg) contrast(110%); ';
    } else if ([4].includes(smallperiod)) {
      return isFront
        ? 'filter: saturate(10.3%) brightness(20%) sepia(0%) hue-rotate(-80deg) contrast(113%); '
        : 'filter: saturate(20.3%) brightness(15%) sepia(0%) hue-rotate(-80deg) contrast(100%); ';
    } else if ([6].includes(smallperiod)) {
      return isFront
        ? 'filter: saturate(34.3%) brightness(48%) sepia(0%) hue-rotate(-50deg) contrast(110%); '
        : 'filter: saturate(50.3%) brightness(36%) sepia(0%) hue-rotate(-50deg) contrast(100%); ';
    } else if ([8].includes(smallperiod)) {
      return isFront
        ? 'filter: saturate(60.3%) brightness(60%) sepia(0%) hue-rotate(-20deg) contrast(110%); '
        : 'filter: saturate(53.3%) brightness(50%) sepia(0%) hue-rotate(-20deg) contrast(100%); ';
    } else if ([10].includes(smallperiod)) {
      return isFront
        ? 'filter: saturate(75.3%) brightness(75%) sepia(0%) hue-rotate(-2deg) contrast(105%); '
        : 'filter: saturate(60.3%) brightness(70%) sepia(0%) hue-rotate(2deg) contrast(100%); ';
    } else if ([14].includes(smallperiod)) {
      return 'filter: saturate(95%) brightness(80%) sepia(1%) hue-rotate(-10deg) contrast(100%); ';
    } else if ([16].includes(smallperiod)) {
      return 'filter: saturate(90%) brightness(60%) sepia(30%) hue-rotate(-15deg) contrast(110%); ';
    } else if ([18].includes(smallperiod)) {
      return 'filter: saturate(100%) brightness(43%) sepia(52%) hue-rotate(-48deg) contrast(120%) ; ';
    } else if ([20].includes(smallperiod)) {
      return 'filter: saturate(100%) brightness(23%) sepia(70%) hue-rotate(-30deg) contrast(120%);  ';
    } else {
      return '';
    }
  }
  setStyle(): void {
    this.style = `${this.getFilter()} z-index:${this.element.zIndex}; ${
      this.xFrom
    }:${this.xPos}%;${this.yFrom}:${this.yPos}%; width:${this.width};
    height:${this.height}; background-image: url('./assets/background/${
      this.path
    }')`;
  }
}
