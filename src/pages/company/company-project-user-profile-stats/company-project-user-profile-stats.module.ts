import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectUserProfileStatsPage } from './company-project-user-profile-stats';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    CompanyProjectUserProfileStatsPage,
  ],
  imports: [
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(CompanyProjectUserProfileStatsPage),
  ],
})
export class CompanyProjectUserProfileStatsPageModule {}
