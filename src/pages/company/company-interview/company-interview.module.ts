import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyInterviewPage } from './company-interview';

@NgModule({
  declarations: [
    CompanyInterviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyInterviewPage),
  ],
})
export class CompanyInterviewPageModule {}
