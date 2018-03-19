import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { PeopleComponent } from './people/people.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PersonDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    DataService,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {}
