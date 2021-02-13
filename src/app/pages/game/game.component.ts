import { TimeService } from '@services/time.service';
import { Component, OnInit } from '@angular/core';
import { TimeObject } from '@app/shared/types/TimeObject';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  time: TimeObject;
  constructor(private timeService: TimeService) {
    this.time = this.timeService.getTimeObject();
  }

  ngOnInit(): void {
    this.timeService.start();
    this.timeService.timeChanged.subscribe((data: any) => {
      this.time = this.timeService.getTimeObject();
    });
  }
}
