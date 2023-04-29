import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListPeliculasComponent } from './component/list-peliculas/list-peliculas.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/shared/material.module';
import { HomeComponent } from './component/home/home.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { DialogMovieComponent } from './component/dialog-movie/dialog-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPeliculasComponent,
    HomeComponent,
    ToolbarComponent,
    DialogMovieComponent
  ],
  entryComponents: [
    DialogMovieComponent
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
