import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectSideMenuPage } from './company-project-side-menu';

@NgModule({
  declarations: [
    CompanyProjectSideMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectSideMenuPage),
  ],
})
export class CompanyProjectSideMenuPageModule {}
