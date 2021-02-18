import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SceneService } from '@app/shared/services/scene.service';
import { TimeService } from '@app/shared/services/time.service';
import { WindowService } from '@app/shared/services/window.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit, AfterViewInit {
  constructor(
    private sceneService: SceneService,
    private timeService: TimeService,
    private windowService: WindowService
  ) {}

  scene: any;
  timeHours: any;
  windowSet = false;

  ngOnInit(): void {
    this.applyScene();
    this.sceneService.sceneChange.subscribe(() => {
      this.applyScene();
    });
    this.timeService.timeChanged.subscribe(() => {
      this.applyScene();
    });
  }

  ngAfterViewInit(): void {
    this.windowService.windowChange.subscribe(() => {
      setTimeout(() => {
        if (this.windowSet === false) this.windowSet = true;
      });
    });
  }

  applyScene(): void {
    this.timeHours = this.timeService.getHours();
    this.scene = this.sceneService.getSceneObject();
  }
}
