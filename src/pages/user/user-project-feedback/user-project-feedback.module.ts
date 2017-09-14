import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackPage } from './user-project-feedback';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserProjectFeedbackPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectFeedbackPage),
  ],
})
export class UserProjectFeedbackPageModule {}
