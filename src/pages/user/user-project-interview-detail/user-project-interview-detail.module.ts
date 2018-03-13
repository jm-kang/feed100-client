import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectInterviewDetailPage } from './user-project-interview-detail';

@NgModule({
  declarations: [
    UserProjectInterviewDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectInterviewDetailPage),
  ],
})
export class UserProjectInterviewDetailPageModule {}
