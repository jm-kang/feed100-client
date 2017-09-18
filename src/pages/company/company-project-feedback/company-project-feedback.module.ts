import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectFeedbackPage } from './company-project-feedback';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyProjectFeedbackPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyProjectFeedbackPage),
  ],
})
export class CompanyProjectFeedbackPageModule {}
