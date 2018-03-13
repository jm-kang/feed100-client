import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileModificationFormPage } from './user-profile-modification-form';

@NgModule({
  declarations: [
    UserProfileModificationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfileModificationFormPage),
  ],
})
export class UserProfileModificationFormPageModule {}
