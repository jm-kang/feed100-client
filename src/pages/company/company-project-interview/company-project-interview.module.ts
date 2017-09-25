import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectInterviewPage } from './company-project-interview';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyProjectInterviewPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyProjectInterviewPage),
  ],
})
export class CompanyProjectInterviewPageModule {}
