import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectInterviewPage } from './admin-project-interview';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminProjectInterviewPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminProjectInterviewPage),
  ],
})
export class AdminProjectInterviewPageModule {}
