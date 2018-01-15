import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectUserParticipationConditionStatsPage } from './admin-project-user-participation-condition-stats';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminProjectUserParticipationConditionStatsPage,
  ],
  imports: [
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(AdminProjectUserParticipationConditionStatsPage),
  ],
})
export class AdminProjectUserParticipationConditionStatsPageModule {}
