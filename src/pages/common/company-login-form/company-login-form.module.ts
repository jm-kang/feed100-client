import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyLoginFormPage } from './company-login-form';

@NgModule({
  declarations: [
    CompanyLoginFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyLoginFormPage),
  ],
})
export class CompanyLoginFormPageModule {}
