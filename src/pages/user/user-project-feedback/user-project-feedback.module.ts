import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackPage } from './user-project-feedback';

@NgModule({
  declarations: [
    UserProjectFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectFeedbackPage),
  ],
})
export class UserProjectFeedbackPageModule {}
