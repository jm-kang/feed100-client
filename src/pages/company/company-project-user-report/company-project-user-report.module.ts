import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectUserReportPage } from './company-project-user-report';

import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyProjectUserReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectUserReportPage),
    PipesModule,
    MomentModule,
  ],
})
export class CompanyProjectUserReportPageModule {}
