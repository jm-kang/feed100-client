import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectRegistrationPage } from './company-project-registration';

@NgModule({
  declarations: [
    CompanyProjectRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectRegistrationPage),
  ],
})
export class CompanyProjectRegistrationPageModule {}
