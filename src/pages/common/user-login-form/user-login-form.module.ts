import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLoginFormPage } from './user-login-form';

@NgModule({
  declarations: [
    UserLoginFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserLoginFormPage),
  ],
})
export class UserLoginFormPageModule {}
