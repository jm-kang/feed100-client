import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectUserInfoPage } from './company-project-user-info';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  declarations: [
    CompanyProjectUserInfoPage,
  ],
  imports: [
    ChartsModule,
    PipesModule,
    IonicPageModule.forChild(CompanyProjectUserInfoPage),
  ],
})
export class CompanyProjectUserInfoPageModule {}
