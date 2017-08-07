import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectPage } from './company-project';

@NgModule({
  declarations: [
    CompanyProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectPage),
  ],
})
export class CompanyProjectPageModule {}
