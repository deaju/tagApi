import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ImageComponent } from './image/image.component';
import {ImageService} from './image.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    ImageSearchComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule, 
    FormsModule, 
    MaterializeModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
