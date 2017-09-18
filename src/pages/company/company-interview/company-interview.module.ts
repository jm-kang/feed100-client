import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyInterviewPage } from './company-interview';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyInterviewPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyInterviewPage),
  ],
})
export class CompanyInterviewPageModule {}
