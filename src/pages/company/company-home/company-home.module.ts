import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyHomePage } from './company-home';

@NgModule({
  declarations: [
    CompanyHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyHomePage),
  ],
})
export class CompanyHomePageModule {}
