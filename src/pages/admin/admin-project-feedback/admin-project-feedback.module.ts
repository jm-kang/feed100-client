import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectFeedbackPage } from './admin-project-feedback';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminProjectFeedbackPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminProjectFeedbackPage),
  ],
})
export class AdminProjectFeedbackPageModule {}
