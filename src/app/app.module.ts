import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GameComponent } from './pages/game/game.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RatioContainerComponent } from './components/ratio-container/ratio-container.component';
import { BackgroundComponent } from './components/background/background.component';
import { TextContentComponent } from './components/text-content/text-content.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
