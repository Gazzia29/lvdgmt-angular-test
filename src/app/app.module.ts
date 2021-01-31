import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GameComponent } from './pages/game/game.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, NotFoundComponent, GameComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
