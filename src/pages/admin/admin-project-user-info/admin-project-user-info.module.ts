import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectUserInfoPage } from './admin-project-user-info';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  declarations: [
    AdminProjectUserInfoPage,
  ],
  imports: [
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(AdminProjectUserInfoPage),
  ],
})
export class AdminProjectUserInfoPageModule {}
