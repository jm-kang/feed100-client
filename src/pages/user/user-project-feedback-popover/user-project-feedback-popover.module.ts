import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackPopoverPage } from './user-project-feedback-popover';

@NgModule({
  declarations: [
    UserProjectFeedbackPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectFeedbackPopoverPage),
  ],
})
export class UserProjectFeedbackPopoverPageModule {}
