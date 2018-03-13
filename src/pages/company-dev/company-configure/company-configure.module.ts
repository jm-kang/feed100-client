import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyConfigurePage } from './company-configure';

@NgModule({
  declarations: [
    CompanyConfigurePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyConfigurePage),
  ],
})
export class CompanyConfigurePageModule {}
