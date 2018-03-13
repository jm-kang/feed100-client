import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectInterviewFormPage } from './user-project-interview-form';

@NgModule({
  declarations: [
    UserProjectInterviewFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectInterviewFormPage),
  ],
})
export class UserProjectInterviewFormPageModule {}
