import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectInterviewDetailPage } from './admin-project-interview-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ElasticModule } from 'angular2-elastic';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    AdminProjectInterviewDetailPage,
  ],
  imports: [
    ElasticModule,
    PipesModule,
    MomentModule,
    ComponentsModule,
    IonicPageModule.forChild(AdminProjectInterviewDetailPage),
  ],
})
export class AdminProjectInterviewDetailPageModule {}
