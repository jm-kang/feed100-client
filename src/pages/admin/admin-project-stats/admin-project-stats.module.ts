import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectStatsPage } from './admin-project-stats';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminProjectStatsPage,
  ],
  imports: [
    Ionic2RatingModule,
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(AdminProjectStatsPage),
  ],
})
export class AdminProjectStatsPageModule {}
