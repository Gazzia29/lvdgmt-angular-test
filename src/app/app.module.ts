import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { MainMenuComponent } from '@pages/main-menu/main-menu.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { GameComponent } from '@pages/game/game.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { RatioContainerComponent } from '@components/ratio-container/ratio-container.component';
import { BackgroundComponent } from '@components/background/background.component';
import { TextContentComponent } from '@components/text-content/text-content.component';
import { SceneElementComponent } from './components/scene-element/scene-element.component';
import { CloudComponent } from './components/cloud/cloud.component';
import { StoryComponent } from './components/story/story.component';
import { SunComponent } from './components/sun/sun.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    NotFoundComponent,
    GameComponent,
    NavBarComponent,
    RatioContainerComponent,
    BackgroundComponent,
    TextContentComponent,
    SceneElementComponent,
    CloudComponent,
    StoryComponent,
    SunComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
