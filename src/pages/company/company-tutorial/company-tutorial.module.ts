import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyTutorialPage } from './company-tutorial';

@NgModule({
  declarations: [
    CompanyTutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyTutorialPage),
  ],
})
export class CompanyTutorialPageModule {}
