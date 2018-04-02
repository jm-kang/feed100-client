import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectInterviewDetailPage } from './company-project-interview-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ElasticModule } from 'angular2-elastic';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    CompanyProjectInterviewDetailPage,
  ],
  imports: [
    ElasticModule,
    PipesModule,
    MomentModule,
    ComponentsModule,
    IonicPageModule.forChild(CompanyProjectInterviewDetailPage),
  ],
})
export class CompanyProjectInterviewDetailPageModule {}
