import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyHelpPage } from './company-help';

@NgModule({
  declarations: [
    CompanyHelpPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyHelpPage),
  ],
})
export class CompanyHelpPageModule {}
