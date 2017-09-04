import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInterviewPage } from './user-interview';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserInterviewPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserInterviewPage),
  ],
})
export class UserInterviewPageModule {}
