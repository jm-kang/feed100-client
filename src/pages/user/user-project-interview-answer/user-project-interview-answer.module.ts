import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectInterviewAnswerPage } from './user-project-interview-answer';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    UserProjectInterviewAnswerPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(UserProjectInterviewAnswerPage),
  ],
})
export class UserProjectInterviewAnswerPageModule {}
