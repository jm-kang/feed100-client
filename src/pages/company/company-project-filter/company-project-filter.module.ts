import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectFilterPage } from './company-project-filter';

@NgModule({
  declarations: [
    CompanyProjectFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectFilterPage),
  ],
})
export class CompanyProjectFilterPageModule {}
