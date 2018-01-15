import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectInterviewDetailPage } from './admin-project-interview-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminProjectInterviewDetailPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminProjectInterviewDetailPage),
  ],
})
export class AdminProjectInterviewDetailPageModule {}
