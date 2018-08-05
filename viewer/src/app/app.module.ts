import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
import {AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './header/header.component';
import { ViewComponent } from './view/view.component';
import { TagrankingPipe } from './tagranking.pipe';
import { SocketService } from './socket.service';
import { SettingComponent } from './setting/setting.component'

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    ImageSearchComponent,
    ImageComponent,
    LoginComponent,
    DetailComponent,
    HeaderComponent,
    ViewComponent,
    TagrankingPipe,
    SettingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    Ng2SearchPipeModule, 
    FormsModule, 
    MaterializeModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
      },
      {
        path:'login',
        component:LoginComponent,
      },
      {
        path: 'search/:keyword',
        component: ImageSearchComponent
      },
      {
        path: 'search',
        component: ImageSearchComponent
      },
      {
        path: 'list',
        component: ViewComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      },
    ],{useHash:true})
  ],
  providers: [ImageService,AuthService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
