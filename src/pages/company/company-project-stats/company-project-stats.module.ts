import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectStatsPage } from './company-project-stats';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    CompanyProjectStatsPage,
  ],
  imports: [
    Ionic2RatingModule,
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(CompanyProjectStatsPage),
  ],
})
export class CompanyProjectStatsPageModule {}
