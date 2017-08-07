import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegistrationFormPage } from './user-registration-form';

@NgModule({
  declarations: [
    UserRegistrationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRegistrationFormPage),
  ],
})
export class UserRegistrationFormPageModule {}
