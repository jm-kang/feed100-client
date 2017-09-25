import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectSideMenuPage } from './company-project-side-menu';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    CompanyProjectSideMenuPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CompanyProjectSideMenuPage),
  ],
})
export class CompanyProjectSideMenuPageModule {}
