import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchComponents } from './components/search/search.components';
import { LeftmenuComponents } from './components/left-menu/left-menu.components';
import { MapComponent } from './components/google-map/map.components';
import { SearchItemComponents } from './components/left-menu/components/search-item/search-item.components';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponents,
    LeftmenuComponents,
    MapComponent,
    SearchItemComponents,
    
  ],
  imports: [NgToastModule,
    BrowserModule],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
