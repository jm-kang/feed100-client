import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyTabsPage } from './company-tabs';

@NgModule({
  declarations: [
    CompanyTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyTabsPage),
  ],
})
export class CompanyTabsPageModule {}
