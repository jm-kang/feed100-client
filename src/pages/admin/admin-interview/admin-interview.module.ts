import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminInterviewPage } from './admin-interview';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminInterviewPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminInterviewPage),
  ],
})
export class AdminInterviewPageModule {}
