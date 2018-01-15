import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectUserProfilePage } from './admin-project-user-profile';

@NgModule({
  declarations: [
    AdminProjectUserProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProjectUserProfilePage),
  ],
})
export class AdminProjectUserProfilePageModule {}
