import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectReportFormPage } from './user-project-report-form';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectReportFormPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectReportFormPage),
  ],
})
export class UserProjectReportFormPageModule {}
