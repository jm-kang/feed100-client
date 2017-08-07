import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackFormPage } from './user-project-feedback-form';

@NgModule({
  declarations: [
    UserProjectFeedbackFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectFeedbackFormPage),
  ],
})
export class UserProjectFeedbackFormPageModule {}
