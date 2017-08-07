import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyAccountModificationFormPage } from './company-account-modification-form';

@NgModule({
  declarations: [
    CompanyAccountModificationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyAccountModificationFormPage),
  ],
})
export class CompanyAccountModificationFormPageModule {}
