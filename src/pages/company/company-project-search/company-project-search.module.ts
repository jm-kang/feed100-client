import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectSearchPage } from './company-project-search';

@NgModule({
  declarations: [
    CompanyProjectSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectSearchPage),
  ],
})
export class CompanyProjectSearchPageModule {}
