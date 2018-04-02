import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectGroupInterviewPage } from './company-project-group-interview';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyProjectGroupInterviewPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyProjectGroupInterviewPage),
  ],
})
export class CompanyProjectGroupInterviewPageModule {}
