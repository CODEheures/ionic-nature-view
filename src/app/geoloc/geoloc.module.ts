import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GeolocPage } from './geoloc.page';
import {AgmCoreModule} from '@agm/core'

const routes: Routes = [
  {
    path: '',
    component: GeolocPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyA--pj-hwf5B6rAbQNZhM5lHwpw4DyV5GA'}),
    RouterModule.forChild(routes)
  ],
  declarations: [GeolocPage]
})
export class GeolocPageModule {}
