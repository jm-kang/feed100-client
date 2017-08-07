import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectUserInfoPage } from './company-project-user-info';

@NgModule({
  declarations: [
    CompanyProjectUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectUserInfoPage),
  ],
})
export class CompanyProjectUserInfoPageModule {}
