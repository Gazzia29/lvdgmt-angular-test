import { Component, OnInit } from '@angular/core';
import { StoryService } from '@app/shared/services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  constructor(private storyService: StoryService) {}

  title!: string;
  main!: string;
  actions!: any[];
  ngOnInit(): void {
    this.applyStory();
    this.storyService.storyChange.subscribe(() => {
      this.applyStory();
    });
  }

  applyStory(): void {
    this.title = this.storyService.getTitle();
    this.main = this.storyService.getMain();
    this.actions = this.storyService.getActions();
  }
}
