import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSnsRegistrationFormPage } from './user-sns-registration-form';

@NgModule({
  declarations: [
    UserSnsRegistrationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSnsRegistrationFormPage),
  ],
})
export class UserSnsRegistrationFormPageModule {}
