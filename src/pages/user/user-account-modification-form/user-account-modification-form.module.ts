import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAccountModificationFormPage } from './user-account-modification-form';

@NgModule({
  declarations: [
    UserAccountModificationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAccountModificationFormPage),
  ],
})
export class UserAccountModificationFormPageModule {}
