import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectStatsPage } from './company-project-stats';

@NgModule({
  declarations: [
    CompanyProjectStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectStatsPage),
  ],
})
export class CompanyProjectStatsPageModule {}
