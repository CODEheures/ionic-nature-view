import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddViewPage } from './add-view.page';
import {GeolocPage} from '../geoloc/geoloc.page'
import {AgmCoreModule} from '@agm/core'

const routes: Routes = [
  {
    path: '',
    component: AddViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyA--pj-hwf5B6rAbQNZhM5lHwpw4DyV5GA'}),
    RouterModule.forChild(routes)
  ],
  declarations: [AddViewPage, GeolocPage],
  entryComponents: [GeolocPage]
})
export class AddViewPageModule {}
