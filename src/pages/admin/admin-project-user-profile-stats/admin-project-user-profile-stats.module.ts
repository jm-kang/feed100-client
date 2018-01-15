import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectUserProfileStatsPage } from './admin-project-user-profile-stats';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminProjectUserProfileStatsPage,
  ],
  imports: [
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(AdminProjectUserProfileStatsPage),
  ],
})
export class AdminProjectUserProfileStatsPageModule {}
