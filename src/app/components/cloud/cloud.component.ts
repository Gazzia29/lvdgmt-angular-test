import { Component, Input, OnInit } from '@angular/core';
import { SceneService } from '@app/shared/services/scene.service';
import { TimeService } from '@app/shared/services/time.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss'],
})
export class CloudComponent implements OnInit {
  @Input() isBack = false;
  opacity = '1';
  filter = '';
  constructor(
    private timeService: TimeService,
    private sceneService: SceneService
  ) {}

  ngOnInit(): void {
    this.setOpacity();
    this.setFilter();
    this.timeService.timeChanged.subscribe(() => {
      this.setOpacity();
      this.setFilter();
    });
  }

  setOpacity(): void {
    const hours = this.timeService.getHours();
    if (hours < 8 || hours > 17) {
      this.opacity = this.isBack ? '0.3' : '0.7';
    } else {
      this.opacity = '1';
    }
  }

  setFilter(): void {
    const smallperiod = this.sceneService.getBackgroundTimePeriod();
    if ([22, 0, 2].includes(smallperiod)) {
      this.filter =
        'saturate(126.3%) brightness(5%) sepia(82%) hue-rotate(-135deg) contrast(104%)';
    } else if ([4].includes(smallperiod)) {
      this.filter =
        'saturate(10.3%) brightness(20%) sepia(0%) hue-rotate(-135deg) contrast(113%)';
    } else if ([6].includes(smallperiod)) {
      this.filter =
        'saturate(34.3%) brightness(48%) sepia(0%) hue-rotate(-7deg) contrast(110%)';
    } else if ([8].includes(smallperiod)) {
      this.filter =
        'saturate(60.3%) brightness(60%) sepia(0%) hue-rotate(-4deg) contrast(110%)';
    } else if ([10].includes(smallperiod)) {
      this.filter =
        'saturate(75.3%) brightness(75%) sepia(0%) hue-rotate(-2deg) contrast(105%)';
    } else if ([14].includes(smallperiod)) {
      this.filter =
        'saturate(90%) brightness(100%) sepia(1%) hue-rotate(-10deg) contrast(100%)';
    } else if ([16].includes(smallperiod)) {
      this.filter =
        'saturate(90%) brightness(50%) sepia(30%) hue-rotate(-15deg) contrast(110%)';
    } else if ([18].includes(smallperiod)) {
      this.filter =
        'saturate(100%) brightness(30%) sepia(52%) hue-rotate(-48deg) contrast(120%)';
    } else if ([20].includes(smallperiod)) {
      this.filter =
        'saturate(100%) brightness(20%) sepia(70%) hue-rotate(-30deg) contrast(120%)';
    } else {
      this.filter = '';
    }
  }
}
