import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectHomePage } from './company-project-home';

@NgModule({
  declarations: [
    CompanyProjectHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectHomePage),
  ],
})
export class CompanyProjectHomePageModule {}
