import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectInterviewDetailPage } from './user-project-interview-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserProjectInterviewDetailPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectInterviewDetailPage),
  ],
})
export class UserProjectInterviewDetailPageModule {}
