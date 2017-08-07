import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyRegistrationFormPage } from './company-registration-form';

@NgModule({
  declarations: [
    CompanyRegistrationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyRegistrationFormPage),
  ],
})
export class CompanyRegistrationFormPageModule {}
