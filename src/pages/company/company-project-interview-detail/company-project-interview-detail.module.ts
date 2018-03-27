import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectInterviewDetailPage } from './company-project-interview-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyProjectInterviewDetailPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyProjectInterviewDetailPage),
  ],
})
export class CompanyProjectInterviewDetailPageModule {}
