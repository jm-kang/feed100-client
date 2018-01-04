import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectUserReportPage } from './admin-project-user-report';

import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminProjectUserReportPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProjectUserReportPage),
    PipesModule,
    MomentModule,
  ],
})
export class AdminProjectUserReportPageModule {}
