import { WindowService } from './../../shared/services/window.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ratio-container',
  templateUrl: './ratio-container.component.html',
  styleUrls: ['./ratio-container.component.scss'],
})
export class RatioContainerComponent implements OnInit, AfterViewInit {
  constructor(private windowService: WindowService) {}
  @ViewChild('width') elem: any;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.elem.nativeElement);

    this.windowService.setSize({
      h: this.elem.nativeElement.offsetHeight,
      w: this.elem.nativeElement.offsetWidth,
    });
  }
}
