import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectUserProfilePage } from './company-project-user-profile';

@NgModule({
  declarations: [
    CompanyProjectUserProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectUserProfilePage),
  ],
})
export class CompanyProjectUserProfilePageModule {}
