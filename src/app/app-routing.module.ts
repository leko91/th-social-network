import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleComponent } from './people/people.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/people',
    pathMatch: 'full'
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'detail/:id',
    component: PersonDetailsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
