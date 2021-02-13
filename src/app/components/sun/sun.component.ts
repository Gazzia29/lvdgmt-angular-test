import { Component, OnInit } from '@angular/core';
import { SceneService } from '@app/shared/services/scene.service';
import { TimeService } from '@app/shared/services/time.service';
import { WindowService } from '@app/shared/services/window.service';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.scss'],
})
export class SunComponent implements OnInit {
  constructor(
    private windowService: WindowService,
    private sceneService: SceneService,
    private timeService: TimeService
  ) {}

  boxShadow: any;
  top = 0;
  left = 0;
  shown = true;
  color = 'white';

  ngOnInit(): void {
    this.setFilter();
    this.timeService.timeChanged.subscribe(() => {
      this.setFilter();
    });
    this.boxShadow =
      '0 0px ' +
      this.relativeSize(4) +
      'px ' +
      this.relativeSize(1.4) +
      'px currentColor, 0 0px ' +
      this.relativeSize(1.5) +
      'px ' +
      this.relativeSize(0.7) +
      'px currentColor, 0 0px ' +
      this.relativeSize(1) +
      'px ' +
      this.relativeSize(0.5) +
      'px currentColor, 0 0px ' +
      this.relativeSize(10) +
      'px ' +
      this.relativeSize(5) +
      'px currentColor';
  }

  relativeSize(size: number): number {
    const baseMultiplicator = 0.08;
    const mult = size * baseMultiplicator;
    const windowHeight = this.windowService.getSize().h || 500;
    return mult * windowHeight;
  }

  setFilter(): void {
    const smallperiod = this.sceneService.getBackgroundTimePeriod();
    this.color = 'white';
    if ([22, 0, 2].includes(smallperiod)) {
      this.shown = false;
    } else if ([4].includes(smallperiod)) {
      this.top = 600;
      this.left = 0;
      this.shown = true;
      this.color = 'pink';
    } else if ([6].includes(smallperiod)) {
      this.top = 77;
      this.left = 0;
      this.shown = true;
      this.color = 'pink';
    } else if ([8].includes(smallperiod)) {
      this.top = 70;
      this.left = 5;
      this.shown = true;
      this.color = '#fecfd8';
    } else if ([10].includes(smallperiod)) {
      this.top = 50;
      this.left = 10;
      this.shown = true;
      this.color = '#ffe9ed';
    } else if ([14].includes(smallperiod)) {
      this.top = 20;
      this.left = 40;
      this.shown = true;
    } else if ([16].includes(smallperiod)) {
      this.top = 45;
      this.left = 45;
      this.shown = true;
      this.color = '#f3ffe9';
    } else if ([18].includes(smallperiod)) {
      this.top = 60;
      this.left = 50;
      this.shown = true;
      this.color = '#f3ffe9';
    } else if ([20].includes(smallperiod)) {
      this.top = 80;
      this.left = 55;
      this.shown = true;
      this.color = '#85311d';
    } else {
      this.top = 6;
      this.left = 20;
      this.shown = true;
    }
  }
}
