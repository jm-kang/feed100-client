import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectReportPage } from './user-project-report';

import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserProjectReportPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectReportPage),
    PipesModule,
    MomentModule,
  ],
})
export class UserProjectReportPageModule {}
