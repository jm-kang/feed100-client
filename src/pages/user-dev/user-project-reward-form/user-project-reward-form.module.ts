import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectRewardFormPage } from './user-project-reward-form';

@NgModule({
  declarations: [
    UserProjectRewardFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectRewardFormPage),
  ],
})
export class UserProjectRewardFormPageModule {}
