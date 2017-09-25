import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectUserParticipationConditionStatsPage } from './company-project-user-participation-condition-stats';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    CompanyProjectUserParticipationConditionStatsPage,
  ],
  imports: [
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(CompanyProjectUserParticipationConditionStatsPage),
  ],
})
export class CompanyProjectUserParticipationConditionStatsPageModule {}
