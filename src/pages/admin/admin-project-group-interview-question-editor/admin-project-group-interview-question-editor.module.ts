import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectGroupInterviewQuestionEditorPage } from './admin-project-group-interview-question-editor';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    AdminProjectGroupInterviewQuestionEditorPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(AdminProjectGroupInterviewQuestionEditorPage),
  ],
})
export class AdminProjectGroupInterviewQuestionEditorPageModule {}
