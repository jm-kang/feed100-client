import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectGroupInterviewQuestionEditorPage } from './company-project-group-interview-question-editor';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    CompanyProjectGroupInterviewQuestionEditorPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(CompanyProjectGroupInterviewQuestionEditorPage),
  ],
})
export class CompanyProjectGroupInterviewQuestionEditorPageModule {}
