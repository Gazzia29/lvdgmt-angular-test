import { Component, OnInit } from '@angular/core';
import { StoryService } from '@app/shared/services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  title!: string;
  main!: string;
  actions!: any[];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.applyStory();
    this.storyService.storyChange.subscribe(() => {
      this.applyStory();
    });
  }

  applyStory(): void {
    this.title = this.storyService.title;
    this.main = this.storyService.main;
    this.actions = this.storyService.actions;
  }
}
