import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectRewardFormPage } from './user-project-reward-form';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    UserProjectRewardFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectRewardFormPage),
    Ionic2RatingModule,
  ],
})
export class UserProjectRewardFormPageModule {}
