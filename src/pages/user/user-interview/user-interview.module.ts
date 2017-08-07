import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInterviewPage } from './user-interview';

@NgModule({
  declarations: [
    UserInterviewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInterviewPage),
  ],
})
export class UserInterviewPageModule {}
